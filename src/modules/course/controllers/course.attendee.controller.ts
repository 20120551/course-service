// courses: get
// course : get, post, put, delete, batch
// invitations: get
// invitation: get, post, batch

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IAttendeeService } from '../services';
import {
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
  SwitchAttendeeRoleDto,
} from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UseCoursePolicies, UserResponse } from 'guards';
import { UserCourseRole } from 'utils/prisma/client';

@UseGuards(AuthenticatedGuard)
@Controller('/api/course/:id/attendee')
export class CourseAttendeeController {
  constructor(
    @Inject(IAttendeeService)
    private readonly _attendeeService: IAttendeeService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get()
  addAttendeeByToken(
    @Param('id') id: string,
    @Query() createAttendeeByTokenDto: CreateAttendeeByTokenDto,
    @User() user: UserResponse,
  ): any {
    return this._attendeeService.addAttendeeToCourseByToken(
      user.userId,
      id,
      createAttendeeByTokenDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put()
  addAttendeeByCode(
    @Param('id') id: string,
    @Body() createAttendeeByCodeDto: CreateAttendeeByCodeDto,
    @User() user: UserResponse,
  ) {
    return this._attendeeService.addAttendeeToCourseByCode(
      user.userId,
      id,
      createAttendeeByCodeDto,
    );
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST] })
  @HttpCode(HttpStatus.OK)
  @Put('role')
  switchAttendee(
    @Param('id') id: string,
    @Body() switchAttendeeDto: SwitchAttendeeRoleDto,
    @User() user: UserResponse,
  ) {
    return this._attendeeService.switchAttendeeRole(
      id,
      user.userId,
      switchAttendeeDto,
    );
  }
}
