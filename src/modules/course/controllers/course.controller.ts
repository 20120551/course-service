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
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IAttendeeService, ICourseService } from '../services';
import {
  CreateCourseDto,
  GetCourseFilterDto,
  SwitchAttendeeRoleDto,
  UpsertCourseDto,
} from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UseCoursePolicies, UserResponse } from 'guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserCourseRole } from '@prisma/client';

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
    @Body() createCourseDto: CreateCourseDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.createCourse(createCourseDto, user);
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

  @UseCoursePolicies({ roles: [UserCourseRole.HOST, UserCourseRole.TEACHER] })
  @HttpCode(HttpStatus.OK)
  @Get(':id/import/template')
  getStudentImportTemplate() {
    return this._courseService.downloadStudentListTemplate();
  }

  @UseCoursePolicies({ roles: [UserCourseRole.HOST, UserCourseRole.TEACHER] })
  @HttpCode(HttpStatus.OK)
  @Post(':id/import/template')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudentList(
    @UploadedFile(
      new ParseFilePipe({
        // max 10mb
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 })],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const payload = {
      filename: file.originalname,
      buffer: file.buffer,
      mimeType: file.mimetype,
    };

    const userResponse = await this._courseService.updateStudentList(
      id,
      payload,
    );

    return userResponse;
  }
}
