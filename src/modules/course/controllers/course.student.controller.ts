// courses: get
// course : get, post, put, delete, batch
// invitations: get
// invitation: get, post, batch

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IAttendeeService } from '../services';
import { SwitchAttendeeRoleDto } from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UseCoursePolicies, UserResponse } from 'guards';
import { UserCourseRole } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthenticatedGuard)
@Controller('/api/course/:id/attendee')
export class CourseStudentController {
  constructor(
    @Inject(IAttendeeService)
    private readonly _attendeeService: IAttendeeService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/student-card')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudentCard(
    @UploadedFile(
      new ParseFilePipe({
        // max 10mb
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 })],
      }),
    )
    file: Express.Multer.File,
    @User() user: UserResponse,
  ) {
    const payload = {
      filename: file.originalname,
      buffer: file.buffer,
      mimeType: file.mimetype,
    };

    const userResponse = await this._attendeeService.updateUserStudentCard(
      user,
      payload,
    );

    return userResponse;
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('role')
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
  @Delete('leave')
  leaveCourse(@Param('id') courseId: string, @User() user: UserResponse) {
    return this._attendeeService.leaveCourse(courseId, user.userId);
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST] })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':attendeeId')
  banOutOfCourse(
    @Param('id') courseId: string,
    @Param('attendeeId') attendeeId,
  ) {
    return this._attendeeService.leaveCourse(courseId, attendeeId);
  }
}
