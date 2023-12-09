// courses: get
// course : get, post, put, delete, batch
// invitations: get
// invitation: get, post, batch

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ICourseService } from '../services';
import {
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
  GetCourseFilterDto,
  UpsertCourseDto,
} from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UseCoursePolicies, UserResponse } from 'guards';
import { UserCourseRole } from 'utils/prisma/client';

// admin //
// courses
// courses/userid
// courses/userid/courseid get, post, delete

@UseGuards(AuthenticatedGuard)
@Controller('/api/course')
export class CourseController {
  constructor(
    @Inject(ICourseService)
    private readonly _courseService: ICourseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getCourses(
    @Query() courseFilterDto: GetCourseFilterDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.getCourses(courseFilterDto, user.userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCourse(@Param('id') id: string, @User() user: UserResponse) {
    return this._courseService.getCourse(id, user.userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createCourse(
    @Body() upsertCourseDto: UpsertCourseDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.createCourse(upsertCourseDto, user.userId);
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST, UserCourseRole.TEACHER] })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() upsertCourseDto: UpsertCourseDto,
  ) {
    return this._courseService.updateCourse(id, upsertCourseDto);
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST, UserCourseRole.TEACHER] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this._courseService.deleteCourse(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get(':id/attendee')
  addAttendeeByToken(
    @Param('id') id: string,
    @Query() createAttendeeByTokenDto: CreateAttendeeByTokenDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.addAttendeeToCourseByToken(
      user.userId,
      id,
      createAttendeeByTokenDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id/attendee')
  addAttendeeByCode(
    @Param('id') id: string,
    @Body() createAttendeeByCodeDto: CreateAttendeeByCodeDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.addAttendeeToCourseByCode(
      user.userId,
      id,
      createAttendeeByCodeDto,
    );
  }
}
