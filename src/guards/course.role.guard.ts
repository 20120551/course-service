import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserCourseRole } from '@prisma/client';
import { COURSE_ROLES_KEY } from 'configurations/role.config';
import { Request } from 'express';
import { UnauthorizedException } from 'utils/errors/domain.error';
import { PrismaService } from 'utils/prisma';

export const CourseRoles = (...roles: any[]) =>
  SetMetadata(COURSE_ROLES_KEY, roles);

@Injectable()
export class CourseRoleGuard implements CanActivate {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const courseId =
      req.body?.id ||
      req.body?.courseId ||
      req.params?.id ||
      req.params?.courseId ||
      req.query?.id ||
      req.query?.courseId;

    if (!courseId) {
      throw new UnauthorizedException("you don't have permission");
    }

    const { userId } = req.user;
    const { role } = await this._prismaService.userCourse.findFirst({
      where: {
        courseId,
        userId,
      },
    });

    const allowRoles = this._reflector.getAllAndOverride<any[]>(
      COURSE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (allowRoles.flat().some((_role) => _role === role)) {
      return true;
    }

    return false;
  }
}

export interface UseCourseRoleOptions {
  roles?: UserCourseRole[];
}
export const UseCoursePolicies = (
  options: UseCourseRoleOptions,
): ClassDecorator & MethodDecorator => {
  return (target: Function, prop?: string, descriptor?: PropertyDescriptor) => {
    CourseRoles(options.roles)(target, prop, descriptor);
    UseGuards(CourseRoleGuard)(target, prop, descriptor);
  };
};
