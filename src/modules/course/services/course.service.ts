import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  UpsertCourseDto,
  GetCourseFilterDto,
  UploadFileDto,
} from '../resources/dto';
import { IFirebaseStorageService } from 'utils/firebase';
import { UserResponse } from 'guards';
import { isEmpty, partition } from 'lodash';
import { CourseResponse } from '../resources/response';
import crypto from 'crypto';
import { IUserService } from './user.service';
import { InvitationState, PrismaClient, UserCourseRole } from '@prisma/client';

export const ICourseService = 'ICourseService';

export interface ICourseService {
  getCourses(courseFilter: GetCourseFilterDto): Promise<CourseResponse[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    user: UserResponse,
  ): Promise<CourseResponse[]>;

  getCourse(courseId: string): Promise<CourseResponse>;
  getCourse(courseId: string, user: UserResponse): Promise<CourseResponse>;

  createCourse(
    course: UpsertCourseDto,
    user: UserResponse,
  ): Promise<CourseResponse>;
  updateCourse(
    courseId: string,
    course: UpsertCourseDto,
  ): Promise<CourseResponse>;
  deleteCourse(courseId: string): Promise<CourseResponse>;

  uploadCourseBackground(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<CourseResponse>;
}

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    private readonly _prisma: PrismaClient,
    private readonly _prismaService: PrismaService,
    @Inject(IFirebaseStorageService)
    private readonly _firebaseStorageService: IFirebaseStorageService,
    @Inject(IUserService)
    private readonly _userService: IUserService,
  ) {}

  async uploadCourseBackground(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<CourseResponse> {
    const { buffer, filename } = uploadFileDto;
    const cardBucket = `background/${filename}`;
    await this._firebaseStorageService.upload(buffer, cardBucket);
    const url = await this._firebaseStorageService.get(cardBucket);

    const result = await this._prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        background: url,
      },
    });

    return result;
  }

  getCourses(courseFilter: GetCourseFilterDto): Promise<CourseResponse[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    user: UserResponse,
  ): Promise<CourseResponse[]>;
  async getCourses(
    courseFilter: GetCourseFilterDto,
    user?: UserResponse,
  ): Promise<CourseResponse[]> {
    let result = [];
    if (user) {
      result = await this._prismaService.course.findMany({
        ...courseFilter,
        where: {
          attendees: {
            some: {
              userId: user.userId,
            },
          },
        },
        include: {
          attendees: {
            where: {
              OR: [
                {
                  role: UserCourseRole.HOST,
                },
                {
                  userId: user.userId,
                },
              ],
            },
            include: {
              user: true,
            },
          },
        },
      });
    } else {
      result = await this._prismaService.course.findMany({
        skip: courseFilter.skip,
        take: courseFilter.take,
      });
    }

    if (!isEmpty(result)) {
      result = result.map((course) => {
        const { attendees, ...payload } = course;
        let [host, attendee] = partition(
          attendees,
          (attendee) => attendee.role === UserCourseRole.HOST,
        );

        if (isEmpty(attendee)) {
          attendee = host;
        }

        const { user: attendeeUser, ...attendeePayload } = attendee[0];
        const { user: hostUser, ...hostPayload } = host[0];

        return {
          ...payload,
          host: { ...hostUser, ...hostPayload },
          profile: { ...attendeeUser, ...attendeePayload },
        };
      });
    }

    return result;
  }

  getCourse(courseId: string): Promise<CourseResponse>;
  getCourse(courseId: string, user: UserResponse): Promise<CourseResponse>;
  async getCourse(
    courseId: string,
    user?: UserResponse,
  ): Promise<CourseResponse> {
    let result = null;
    if (user) {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
          attendees: {
            some: {
              userId: user.userId,
            },
          },
        },
        include: {
          attendees: {
            include: {
              user: true,
            },
          },
          invitations: true,
        },
      });
    } else {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          attendees: {
            include: {
              user: true,
            },
          },
          invitations: true,
        },
      });
    }

    if (!result) {
      throw new BadRequestException('not found course');
    }

    const { attendees, invitations, ...payload } = result;
    const [host, _attendees] = partition(
      attendees,
      (attendee) => attendee.role === UserCourseRole.HOST,
    );

    const notAlreadyAcceptedInvitations = invitations.filter(
      (invitation) => invitation.state !== InvitationState.ACCEPTED,
    );

    const responseAttendees = _attendees.map((attendee) => {
      const { user, ...payload } = attendee;
      return {
        ...payload,
        ...user,
      };
    });

    const { user: hostUser, ...hostPayload } = host[0];
    return {
      ...payload,
      attendees: responseAttendees,
      invitations: notAlreadyAcceptedInvitations,
      host: { ...hostUser, ...hostPayload },
    };
  }

  async createCourse(
    course: UpsertCourseDto,
    user: UserResponse,
  ): Promise<CourseResponse> {
    let result = null;
    let attempt = 0;
    do {
      ++attempt;
      console.log(`current attempt ${attempt}`);
      const _course = await this._prismaService.course.findFirst({
        where: {
          code: course.code,
        },
      });

      if (_course) {
        course.code = crypto.randomBytes(4).toString('hex').toUpperCase();
        continue;
      }

      result = await this._prisma.$transaction(async (context) => {
        await this._userService.createUser(user);
        const result = await context.course.create({
          data: {
            code: course.code,
            name: course.name,
            desc: course.desc,
            attendees: {
              create: {
                userId: user.userId,
                role: UserCourseRole.HOST,
              },
            },
          },
          include: {
            attendees: true,
          },
        });

        return result;
      });
    } while (attempt < 10 && result === null);

    if (result === null) {
      throw new BadRequestException(
        'cannot create course because of duplicate code',
      );
    }

    const { attendees, ...payload } = result;
    const { user: hostUser, ...hostPayload } = attendees[0];

    return {
      ...payload,
      host: { ...hostPayload, ...hostUser },
    };
  }

  async updateCourse(
    courseId: string,
    course: UpsertCourseDto,
  ): Promise<CourseResponse> {
    const result = await this._prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...course,
      },
    });

    return result;
  }

  async deleteCourse(courseId: string): Promise<CourseResponse> {
    const result = await this._prismaService.course.delete({
      where: {
        id: courseId,
      },
    });

    return result;
  }
}
