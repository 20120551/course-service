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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IAttendeeService, ICourseService } from '../services';
import {
  GetCourseFilterDto,
  SwitchAttendeeRoleDto,
  UpsertCourseDto,
} from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UseCoursePolicies, UserResponse } from 'guards';
import { UserCourseRole } from 'utils/prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Inject(IAttendeeService)
    private readonly _attendeeService: IAttendeeService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getCourses(
    @Query() courseFilterDto: GetCourseFilterDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.getCourses(courseFilterDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCourse(@Param('id') id: string, @User() user: UserResponse) {
    return this._courseService.getCourse(id, user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createCourse(
    @Body() upsertCourseDto: UpsertCourseDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.createCourse(upsertCourseDto, user);
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST, UserCourseRole.TEACHER] })
  @HttpCode(HttpStatus.OK)
  @Put('/:id/background')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const payload = {
      filename: file.originalname,
      buffer: file.buffer,
      mimeType: file.mimetype,
    };

    return this._courseService.uploadCourseBackground(id, payload);
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

  @UseCoursePolicies({ roles: [UserCourseRole.HOST] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this._courseService.deleteCourse(id);
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id/role')
  switchAttendee(
    @Param('id') courseId: string,
    @Body() switchAttendeeDto: SwitchAttendeeRoleDto,
    @User() user: UserResponse,
  ) {
    return this._attendeeService.switchAttendeeRole(
      courseId,
      user,
      switchAttendeeDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/leave')
  leaveCourse(@Param('id') courseId: string, @User() user: UserResponse) {
    return this._attendeeService.leaveCourse(courseId, user.userId);
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/ban/:attendeeId')
  banOutOfCourse(
    @Param('id') courseId: string,
    @Param('attendeeId') attendeeId,
  ) {
    return this._attendeeService.leaveCourse(courseId, attendeeId);
  }
}
