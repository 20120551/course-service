import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import { Invitation, PrismaClient } from '@prisma/client';
import {
  CreateInvitationDto,
  GetInvitationFilterDto,
  DeleteInvitationDto,
  UpdateInvitationDto,
} from '../resources/dto';
import { differenceBy, intersectionBy, isEmpty } from 'lodash';
import BPromise from 'bluebird';
import { BatchResponse } from '../resources/response';

export const IInvitationService = 'IInvitationService';
export interface IInvitationService {
  getInvitations(
    courseId: string,
    getInvitationdto: GetInvitationFilterDto,
  ): Promise<Invitation[]>;
  getInvitation(courseId: string, invitationId: string): Promise<Invitation>;
  createInvitations(
    userId: string,
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

    return result;
  }

  async createInvitations(
    userId: string,
    courseId: string,
    createInvitationsDto: CreateInvitationDto[],
  ): Promise<BatchResponse> {
    const invitations = await this._prismaService.invitation.findMany({
      where: {
        courseId,
      },
    });

    const filteredInvitations = differenceBy(
      createInvitationsDto,
      invitations,
      'email',
    );

    const result = await this._prismaService.invitation.createMany({
      data: filteredInvitations.map((data) => ({
        ...data,
        invitedBy: userId,
        courseId,
      })),
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
      'email',
    );

    const result = await this._prismaService.invitation.deleteMany({
      where: {
        email: {
          in: filteredInvitations.map(({ email }) => email),
        },
      },
    });

    return result;
  }
}
