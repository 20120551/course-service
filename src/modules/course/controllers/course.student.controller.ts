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
  Get,
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
import { SwitchAttendeeRoleDto, UpdateStudentCardDto } from '../resources/dto';
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
  @Get('/student-card')
  async getStudentCards(@User() user: UserResponse) {
    const userResponse = await this._attendeeService.getStudentCards(
      user.userId,
    );

    return userResponse;
  }

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
    @Param('id') courseId: string,
    @User() user: UserResponse,
  ) {
    const payload = {
      filename: file.originalname,
      buffer: file.buffer,
      mimeType: file.mimetype,
    };

    const userResponse = await this._attendeeService.uploadUserStudentCard(
      courseId,
      user,
      payload,
    );

    return userResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/student-card/:cardId')
  async updateStudentCard(
    @Param('cardId') cardId: string,
    @User() user: UserResponse,
    @Body() cardDto: UpdateStudentCardDto,
  ) {
    const userResponse = await this._attendeeService.updateUserStudentCard(
      cardId,
      user.userId,
      cardDto,
    );

    return userResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/student-card/:cardId')
  async deleteStudentCard(@Param('cardId') cardId: string) {
    const userResponse =
      await this._attendeeService.deleteUserStudentCard(cardId);

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
    @Param('attendeeId') attendeeId: string,
  ) {
    return this._attendeeService.leaveCourse(courseId, attendeeId);
  }
}
