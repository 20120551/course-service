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
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IAttendeeService } from '../services';
import {
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
} from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UserResponse } from 'guards';

@UseGuards(AuthenticatedGuard)
@Controller('/api/course/attendee')
export class CourseAttendeeController {
  constructor(
    @Inject(IAttendeeService)
    private readonly _attendeeService: IAttendeeService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('token')
  addAttendeeByToken(
    @Query() createAttendeeByTokenDto: CreateAttendeeByTokenDto,
    @User() user: UserResponse,
  ): any {
    return this._attendeeService.addAttendeeToCourseByToken(
      user,
      createAttendeeByTokenDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('code')
  addAttendeeByCode(
    @Body() createAttendeeByCodeDto: CreateAttendeeByCodeDto,
    @User() user: UserResponse,
  ) {
    return this._attendeeService.addAttendeeToCourseByCode(
      user,
      createAttendeeByCodeDto,
    );
  }
}
