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
import { GetCourseFilterDto, UpsertCourseDto } from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard } from 'guards';
import { UserResponse } from '../resources/responses';

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

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() upsertCourseDto: UpsertCourseDto,
    @User() user: UserResponse,
  ) {
    return this._courseService.updateCourse(id, upsertCourseDto, user.userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Param('id') id: string, @User() user: UserResponse) {
    return this._courseService.deleteCourse(id, user.userId);
  }
}
