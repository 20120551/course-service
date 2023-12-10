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
} from '@nestjs/common';
import { ICourseService } from '../services';
import { GetCourseFilterDto, UpsertCourseDto } from '../resources/dto';

@Controller('/api/admin/course')
export class CourseAdminController {
  constructor(
    @Inject(ICourseService)
    private readonly _courseService: ICourseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getCourses(@Query() courseFilterDto: GetCourseFilterDto) {
    return this._courseService.getCourses(courseFilterDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this._courseService.getCourse(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createCourse(@Body() upsertCourseDto: UpsertCourseDto) {
    // return this._courseService.createCourse(
    //   upsertCourseDto,
    //   {userId: upsertCourseDto.userId},
    // );
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() upsertCourseDto: UpsertCourseDto,
  ) {
    return this._courseService.updateCourse(id, upsertCourseDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this._courseService.deleteCourse(id);
  }
}
