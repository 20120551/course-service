import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
  SwitchAttendeeRoleDto,
} from '../resources/dto';
import { Course, UserCourseRole } from 'utils/prisma/client';
import { ICryptoJSService } from 'utils/hash/cryptojs';
import { InvitationState } from 'utils/prisma/client';
import { PrismaClient } from 'utils/prisma/client';
import { UserResponse } from 'guards';
import { CourseResponse } from '../resources/response';
import { IUserService } from './user.service';

export const IAttendeeService = 'IAttendeeService';

export interface IAttendeeService {
  switchAttendeeRole(
    courseId: string,
    user: UserResponse,
    switchAttendeeRoleDto: SwitchAttendeeRoleDto,
  ): Promise<void>;

  leaveCourse(courseId: string, userId: string): Promise<void>;

  addAttendeeToCourseByCode(
    user: UserResponse,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<CourseResponse>;

  addAttendeeToCourseByToken(
    user: UserResponse,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<CourseResponse>;
}

@Injectable()
export class AttendeeService implements IAttendeeService {
  constructor(
    private readonly _prisma: PrismaClient,
    private readonly _prismaService: PrismaService,
    @Inject(ICryptoJSService)
    private readonly _cryptoJSService: ICryptoJSService,
    @Inject(IUserService)
    private readonly _userService: IUserService,
  ) {}

  async switchAttendeeRole(
    courseId: string,
    user: UserResponse,
    switchAttendeeRoleDto: SwitchAttendeeRoleDto,
  ): Promise<void> {
    if (user.userId === switchAttendeeRoleDto.attendeeId) {
      throw new BadRequestException('cannot be switch your own role');
    }

    const attendee = await this._prismaService.userCourse.findFirst({
      where: {
        courseId,
        userId: switchAttendeeRoleDto.attendeeId,
      },
    });

    if (!attendee) {
      throw new BadRequestException('Not found attendee');
    }

    // switch to host
    if (switchAttendeeRoleDto.role === UserCourseRole.HOST) {
      await this._prisma.$transaction(
        async (context) => {
          await context.userCourse.update({
            where: {
              userId_courseId: {
                userId: user.userId,
                courseId,
              },
            },
            data: {
              role: UserCourseRole.TEACHER,
            },
          });

          await context.userCourse.update({
            where: {
              userId_courseId: {
                userId: attendee.userId,
                courseId,
              },
            },
            data: {
              role: UserCourseRole.HOST,
            },
          });
        },
        {
          maxWait: 5000,
          timeout: 10000,
        },
      );
    } else {
      await this._prismaService.userCourse.update({
        where: {
          userId_courseId: {
            userId: attendee.userId,
            courseId,
          },
        },
        data: {
          role: switchAttendeeRoleDto.role,
        },
      });
    }
  }

  async addAttendeeToCourseByCode(
    user: UserResponse,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<CourseResponse> {
    const course = await this._prismaService.course.findFirst({
      where: {
        code: createAttendeeByCodeDto.code,
      },
      include: {
        attendees: {
          where: {
            role: UserCourseRole.HOST,
          },
        },
      },
    });

    if (!course) {
      throw new BadRequestException('not found course with code');
    }

    const attendee = await this._prismaService.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.userId,
          courseId: course.id,
        },
      },
    });

    // joined
    if (attendee) {
      const res = await this._getCourseResponse(course, user);
      return res;
    }

    const result = await this._prisma.$transaction(async (context) => {
      await this._userService.createUser(user);

      const result = await context.course.update({
        where: {
          id: course.id,
        },
        data: {
          attendees: {
            create: {
              userId: user.userId,
              role: UserCourseRole.STUDENT,
            },
          },
        },
        include: {
          attendees: {
            where: {
              role: UserCourseRole.HOST,
            },
            include: {
              user: true,
            },
          },
        },
      });

      if (!result) {
        throw new BadRequestException(
          `not found course with code ${createAttendeeByCodeDto.code}`,
        );
      }
      return result;
    });

    const res = this._getCourseResponse(result, user);
    return res;
  }

  async addAttendeeToCourseByToken(
    user: UserResponse,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<CourseResponse> {
    const decrypt = this._cryptoJSService.decrypt<{
      id: string;
    }>(createAttendeeByTokenDto.token.replaceAll(' ', '+'));

    const invitation = await this._prismaService.invitation.findUnique({
      where: {
        id: decrypt.id,
      },
    });

    if (!invitation) {
      throw new BadRequestException('not found invitation');
    }

    const result = await this._prisma.$transaction(async (context) => {
      await this._userService.createUser(user);
      const result = await context.course.update({
        where: {
          id: invitation.courseId,
        },
        data: {
          attendees: {
            create: {
              userId: user.userId,
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
        include: {
          attendees: {
            where: {
              role: UserCourseRole.HOST,
            },
            include: {
              user: true,
            },
          },
        },
      });

      if (!result) {
        throw new BadRequestException(
          `not found course with token ${createAttendeeByTokenDto.token}`,
        );
      }
      return result;
    });

    const res = this._getCourseResponse(result, user);
    return res;
  }

  async leaveCourse(courseId: string, userId: string): Promise<void> {
    const attendee = await this._prismaService.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId,
        },
      },
    });

    if (!attendee) {
      throw new BadRequestException(`not found user ${userId} in course`);
    }

    if (attendee.role === UserCourseRole.HOST) {
      await this._prismaService.course.delete({
        where: {
          id: courseId,
        },
      });
    } else {
      await this._prismaService.userCourse.delete({
        where: {
          userId_courseId: {
            userId: userId,
            courseId,
          },
        },
      });
    }
  }

  private _getCourseResponse(course: any, user: UserResponse) {
    const { attendees, ...payload } = course;

    return {
      ...payload,
      host: {
        ...attendees[0],
        ...attendees[0].user,
      },
      profile: {
        ...user,
      },
    };
  }
}
