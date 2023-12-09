import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  UpsertCourseDto,
  GetCourseFilterDto,
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
} from '../resources/dto';
import { Course, UserCourseRole } from 'utils/prisma/client';
import { ICryptoJSService } from 'utils/hash/cryptojs';
import { InvitationState } from 'utils/prisma/client';

export const ICourseService = 'ICourseService';

export interface ICourseService {
  getCourses(courseFilter: GetCourseFilterDto): Promise<Course[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<Course[]>;

  getCourse(courseId: string): Promise<Course>;
  getCourse(courseId: string, userId: string): Promise<Course>;

  createCourse(course: UpsertCourseDto, userId: string): Promise<Course>;
  updateCourse(courseId: string, course: UpsertCourseDto): Promise<Course>;
  deleteCourse(courseId: string): Promise<Course>;

  addAttendeeToCourseByCode(
    userId: string,
    courseId: string,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<void>;

  addAttendeeToCourseByToken(
    userId: string,
    courseId: string,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<void>;
}

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    private readonly _prismaService: PrismaService,
    @Inject(ICryptoJSService)
    private readonly _cryptoJSService: ICryptoJSService,
  ) {}

  getCourses(courseFilter: GetCourseFilterDto): Promise<Course[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<Course[]>;
  async getCourses(
    courseFilter: GetCourseFilterDto,
    userId?: string,
  ): Promise<Course[]> {
    let result: Course[] = [];
    if (userId) {
      result = await this._prismaService.course.findMany({
        skip: courseFilter.skip,
        take: courseFilter.take,
        where: {
          attendees: {
            some: {
              userId: userId,
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

    return result;
  }

  getCourse(courseId: string): Promise<Course>;
  getCourse(courseId: string, userId: string): Promise<Course>;
  async getCourse(courseId: string, userId?: string): Promise<Course> {
    let result: Course = null;
    if (userId) {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
          attendees: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          attendees: true,
        },
      });
    } else {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          attendees: true,
        },
      });
    }

    return result;
  }

  async createCourse(course: UpsertCourseDto, userId: string): Promise<Course> {
    const result = await this._prismaService.course.create({
      data: {
        ...course,
        attendees: {
          create: {
            userId: userId,
            role: UserCourseRole.HOST,
          },
        },
      },
    });

    return result;
  }

  async updateCourse(
    courseId: string,
    course: UpsertCourseDto,
  ): Promise<Course> {
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

  async deleteCourse(courseId: string): Promise<Course> {
    const result = await this._prismaService.course.delete({
      where: {
        id: courseId,
      },
    });

    return result;
  }

  async addAttendeeToCourseByCode(
    userId: string,
    courseId: string,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<void> {
    await this._prismaService.course.update({
      where: {
        id: courseId,
        code: createAttendeeByCodeDto.code,
      },
      data: {
        attendees: {
          create: {
            userId,
            role: UserCourseRole.STUDENT,
          },
        },
      },
    });
  }

  async addAttendeeToCourseByToken(
    userId: string,
    courseId: string,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<void> {
    const decrypt = this._cryptoJSService.decrypt<{
      id: string;
    }>(createAttendeeByTokenDto.token);

    const invitation = await this._prismaService.invitation.findUnique({
      where: {
        id: decrypt.id,
      },
    });

    if (invitation.courseId !== courseId) {
      throw new BadRequestException('course id not matched');
    }

    await this._prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        attendees: {
          create: {
            userId,
            role: invitation.role,
            invitationId: invitation.id,
          },
        },
        invitations: {
          update: {
            where: {
              id: invitation.id,
            },
            data: {
              state: InvitationState.ACCEPTED,
            },
          },
        },
      },
    });
  }
}
