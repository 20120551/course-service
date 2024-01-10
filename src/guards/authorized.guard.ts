import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ForbiddenException } from 'utils/errors/domain.error';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { SetMetadata } from '@nestjs/common';
import {
  POLICIES_KEY,
  ROLES_KEY,
  SupportedRole,
} from 'configurations/role.config';

export const Roles = (...roles: any[]) => SetMetadata(ROLES_KEY, roles);
export const Policies = (...polices: any[]) =>
  SetMetadata(POLICIES_KEY, polices);

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const requiredRoles = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = request;

    if (
      requiredRoles.flat().some((_role) => user.userMetadata.role === _role)
    ) {
      return true;
    }

    return false;
  }
}

export interface UseAuthorizeOptions {
  policies?: {
    [index: string]: string;
  };
  roles?: SupportedRole[];
}
export const UseAuthorized = (
  options: UseAuthorizeOptions,
): ClassDecorator & MethodDecorator => {
  return (target: Function, prop?: string, descriptor?: PropertyDescriptor) => {
    Roles(options.roles)(target, prop, descriptor);
    Policies(options.policies)(target, prop, descriptor);
    UseGuards(AuthorizedGuard)(target, prop, descriptor);
  };
};
