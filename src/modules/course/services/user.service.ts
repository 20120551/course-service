import { Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import { UserResponse } from 'guards';

export const IUserService = 'IUserService';

export interface IUserService {
  createUser(user: UserResponse): Promise<void>;

  updateUser(user: UserResponse): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly _prismaService: PrismaService) {}

  async createUser({
    userId: id,
    email,
    name,
    picture,
  }: UserResponse): Promise<void> {
    const _user = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (_user) {
      return;
    }

    await this._prismaService.user.create({
      data: {
        id,
        email,
        name,
        picture,
      },
    });
  }

  async updateUser({
    userId: id,
    email,
    name,
    picture,
  }: UserResponse): Promise<void> {
    const _user = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!_user) {
      return;
    }

    await this._prismaService.user.update({
      where: {
        id,
      },
      data: {
        picture,
        name,
        email,
      },
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const _user = await this._prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!_user) {
      return;
    }

    await this._prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
