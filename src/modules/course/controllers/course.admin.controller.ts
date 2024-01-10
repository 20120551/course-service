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
import { IAdminService, IAttendeeService, ICourseService } from '../services';
import {
  AdminCourseFilterDto,
  AdminUpsertCourseDto,
  CreateCourseDto,
  GetCourseFilterDto,
} from '../resources/dto';
import { AuthenticatedGuard, UseAuthorized, UserResponse } from 'guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupportedRole } from 'configurations/role.config';

@UseAuthorized({ roles: [SupportedRole.ADMIN] })
@UseGuards(AuthenticatedGuard)
@Controller('/api/admin/course')
export class CourseAdminController {
  constructor(
    @Inject(ICourseService)
    private readonly _courseService: ICourseService,
    @Inject(IAdminService)
    private readonly _adminService: IAdminService,
    @Inject(IAttendeeService)
    private readonly _attendeeService: IAttendeeService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/student/card')
  async getStudentCard(@Query() { userId }: { userId: string }) {
    const userResponse = await this._attendeeService.getStudentCards(userId);

    return userResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  getAllCourses(@Query() query: GetCourseFilterDto) {
    return this._courseService.getAllCourses(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getCourses(@Query() { userId, ...payload }: AdminCourseFilterDto) {
    return this._courseService.getCourses(payload, {
      userId: userId,
    } as UserResponse);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this._courseService.getCourse(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createCourse(@Body() { userId, ...payload }: CreateCourseDto) {
    return this._courseService.createCourse(payload, {
      userId: userId,
    } as UserResponse);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() upsertCourseDto: AdminUpsertCourseDto,
  ) {
    return this._courseService.updateCourse(id, upsertCourseDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this._courseService.deleteCourse(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/template/import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudentMapping(
    @UploadedFile(
      new ParseFilePipe({
        // max 10mb
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const payload = {
      filename: file.originalname,
      buffer: file.buffer,
      mimeType: file.mimetype,
    };

    const userResponse =
      await this._adminService.uploadMappingStudentId(payload);

    return userResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/template/import')
  async downloadStudentMappingTemplate() {
    const userResponse = await this._adminService.downloadMappingStudentId();

    return userResponse;
  }
}
