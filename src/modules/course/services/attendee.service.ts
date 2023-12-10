import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
  SwitchAttendeeRoleDto,
} from '../resources/dto';
import { UserCourseRole } from 'utils/prisma/client';
import { ICryptoJSService } from 'utils/hash/cryptojs';
import { InvitationState } from 'utils/prisma/client';
import { PrismaClient } from 'utils/prisma/client';
import { UserResponse } from 'guards';

export const IAttendeeService = 'IAttendeeService';

export interface IAttendeeService {
  switchAttendeeRole(
    courseId: string,
    user: UserResponse,
    switchAttendeeRoleDto: SwitchAttendeeRoleDto,
  ): Promise<void>;

  addAttendeeToCourseByCode(
    user: UserResponse,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<void>;

  addAttendeeToCourseByToken(
    user: UserResponse,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<void>;
}

@Injectable()
export class AttendeeService implements IAttendeeService {
  constructor(
    private readonly _prisma: PrismaClient,
    private readonly _prismaService: PrismaService,
    @Inject(ICryptoJSService)
    private readonly _cryptoJSService: ICryptoJSService,
  ) {}

  async switchAttendeeRole(
    courseId: string,
    user: UserResponse,
    switchAttendeeRoleDto: SwitchAttendeeRoleDto,
  ): Promise<void> {
    if (user.userId === switchAttendeeRoleDto.attendeeId) {
      return;
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
  ): Promise<void> {
    await this._prismaService.course.update({
      where: {
        code: createAttendeeByCodeDto.code,
      },
      data: {
        attendees: {
          create: {
            userId: user.userId,
            email: user.email,
            role: UserCourseRole.STUDENT,
          },
        },
      },
    });
  }

  async addAttendeeToCourseByToken(
    user: UserResponse,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<void> {
    console.log(createAttendeeByTokenDto);
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

    await this._prismaService.course.update({
      where: {
        id: invitation.courseId,
      },
      data: {
        attendees: {
          create: {
            userId: user.userId,
            email: user.email,
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
