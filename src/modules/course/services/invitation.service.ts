import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  CreateInvitationDto,
  GetInvitationFilterDto,
  DeleteInvitationDto,
  UpdateInvitationDto,
} from '../resources/dto';
import { differenceBy, intersectionBy, isEmpty } from 'lodash';
import BPromise from 'bluebird';
import { BatchResponse } from '../resources/response';
import { ISendgridService } from 'utils/sendgrid';
import { ICryptoJSService } from 'utils/hash/cryptojs';
import * as invitationTemplate from 'templates/invitation.html';
import { UserResponse } from 'guards';
import { Invitation, PrismaClient } from '@prisma/client';

export const IInvitationService = 'IInvitationService';
export interface IInvitationService {
  getInvitations(
    courseId: string,
    getInvitationdto: GetInvitationFilterDto,
  ): Promise<Invitation[]>;
  getInvitation(courseId: string, invitationId: string): Promise<Invitation>;
  createInvitations(
    user: UserResponse,
    courseId: string,
    createInvitationsDto: CreateInvitationDto[],
  ): Promise<BatchResponse>;
  updateInvitation(
    courseId: string,
    updateInvitationsDto: UpdateInvitationDto[],
  ): Promise<BatchResponse>;
  deleteInvitation(
    courseId: string,
    updateInvitationsDto: DeleteInvitationDto[],
  ): Promise<BatchResponse>;
}

@Injectable()
export class InvitationService implements IInvitationService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _prisma: PrismaClient,
    @Inject(ISendgridService)
    private readonly _sendgirdService: ISendgridService,
    @Inject(ICryptoJSService)
    private readonly _cryptoJSService: ICryptoJSService,
  ) {}

  async getInvitations(
    courseId: string,
    getInvitationDto: GetInvitationFilterDto,
  ): Promise<Invitation[]> {
    const result = await this._prismaService.invitation.findMany({
      ...getInvitationDto,
      where: {
        courseId,
      },
    });

    return result;
  }

  async getInvitation(
    courseId: string,
    invitationId: string,
  ): Promise<Invitation> {
    const result = await this._prismaService.invitation.findUnique({
      where: {
        id: invitationId,
        courseId: courseId,
      },
    });

    if (!result) {
      throw new BadRequestException('not found invitation');
    }

    return result;
  }

  async createInvitations(
    user: UserResponse,
    courseId: string,
    createInvitationsDto: CreateInvitationDto[],
  ): Promise<BatchResponse> {
    const course = await this._prismaService.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        userCourses: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        invitations: {
          select: {
            email: true,
          },
        },
      },
    });

    // filter by invitation
    const filteredInvitations = differenceBy(
      createInvitationsDto,
      [
        course.userCourses.map((attendee) => {
          const { user, ...payload } = attendee;
          return {
            ...user,
            ...payload,
          };
        }),
        ...course.invitations,
      ],
      'email',
    );

    //

    if (isEmpty(filteredInvitations)) {
      return {
        count: 0,
      };
    }

    const result = await this._prismaService.invitation.createMany({
      data: filteredInvitations.map((data) => ({
        ...data,
        invitedBy: user.userId,
        courseId,
      })),
    });

    await BPromise.map(filteredInvitations, async (invitation) => {
      const encrypt = this._cryptoJSService.encrypt({
        id: invitation.id,
      });

      const url = `${process.env.FE_BASE_URL}/course/attendee?token=${encrypt}`;
      const formatHtml = invitationTemplate.default
        .replaceAll('{{name}}', invitation.email)
        .replaceAll('{{action_url}}', url)
        .replaceAll('{{invite_sender_name}}', 'HPCLASS')
        .replaceAll('{{invite_sender_organization_name}}', 'HCMUS')
        .replaceAll('[Product Name]', 'HPCLASS');

      await this._sendgirdService.send({
        to: invitation.email,
        subject: `Invitation to course by ${user.name}`,
        from: '20120551@student.hcmus.edu.vn', // Fill it with your validated email on SendGrid account
        text: 'Hello',
        html: formatHtml,
      });
    });

    return result;
  }

  async updateInvitation(
    courseId: string,
    updateInvitationsDto: UpdateInvitationDto[],
  ): Promise<BatchResponse> {
    await this._prisma.$transaction(
      async (context) => {
        const invitations = await context.invitation.findMany({
          where: {
            courseId,
          },
        });

        if (isEmpty(invitations) && !isEmpty(updateInvitationsDto)) {
          throw new BadRequestException(
            `Not found invitation at course id ${courseId}`,
          );
        }

        const filteredInvitations = intersectionBy(
          updateInvitationsDto,
          invitations,
          'id',
        );

        await BPromise.map(
          filteredInvitations,
          (invitation) => {
            return context.invitation.update({
              where: {
                id: invitation.id,
              },
              data: {
                state: invitation.state,
              },
            });
          },
          { concurrency: 5 },
        );
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    return {
      count: updateInvitationsDto.length,
    };
  }

  async deleteInvitation(
    courseId: string,
    updateInvitationsDto: DeleteInvitationDto[],
  ): Promise<BatchResponse> {
    const invitations = await this._prismaService.invitation.findMany({
      where: {
        courseId,
      },
    });

    if (isEmpty(invitations) && !isEmpty(updateInvitationsDto)) {
      throw new BadRequestException(
        `Not found invitation at course id ${courseId}`,
      );
    }

    const filteredInvitations = intersectionBy(
      updateInvitationsDto,
      invitations,
      'id',
    );

    const result = await this._prismaService.invitation.deleteMany({
      where: {
        id: {
          in: filteredInvitations.map(({ id }) => id),
        },
      },
    });

    return result;
  }
}
