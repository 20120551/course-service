import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  UpsertCourseDto,
  GetCourseFilterDto,
  UploadFileDto,
} from '../resources/dto';
import { Course, UserCourse, UserCourseRole } from 'utils/prisma/client';
import { IFirebaseStorageService } from 'utils/firebase';

export const ICourseService = 'ICourseService';

export interface ICourseService {
  getCourses(courseFilter: GetCourseFilterDto): Promise<UserCourse[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<UserCourse[]>;

  getCourse(courseId: string): Promise<Course>;
  getCourse(courseId: string, userId: string): Promise<Course>;

  createCourse(course: UpsertCourseDto, userId: string): Promise<Course>;
  updateCourse(courseId: string, course: UpsertCourseDto): Promise<Course>;
  deleteCourse(courseId: string): Promise<Course>;

  uploadCourseBackground(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<Course>;
}

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    private readonly _prismaService: PrismaService,
    @Inject(IFirebaseStorageService)
    private readonly _firebaseStorageService: IFirebaseStorageService,
  ) {}

  async uploadCourseBackground(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<Course> {
    const { buffer, filename } = uploadFileDto;
    const cardBucket = `background/${filename}`;
    await this._firebaseStorageService.upload(buffer, cardBucket);
    const url = await this._firebaseStorageService.get(cardBucket);

    const result = await this._prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        background: url,
      },
    });

    return result;
  }

  getCourses(courseFilter: GetCourseFilterDto): Promise<UserCourse[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<UserCourse[]>;
  async getCourses(
    courseFilter: GetCourseFilterDto,
    userId?: string,
  ): Promise<UserCourse[]> {
    let result: UserCourse[] = [];
    if (userId) {
      result = await this._prismaService.userCourse.findMany({
        ...courseFilter,
        where: {
          userId: userId,
        },
        include: {
          course: true,
        },
      });
      // result = await this._prismaService.course.findMany({
      //   skip: courseFilter.skip,
      //   take: courseFilter.take,
      //   where: {
      //     attendees: {
      //       some: {
      //         userId: userId,
      //       },
      //     },
      //   },
      // });
    } else {
      // result = await this._prismaService.course.findMany({
      //   skip: courseFilter.skip,
      //   take: courseFilter.take,
      // });
      result = await this._prismaService.userCourse.findMany({
        ...courseFilter,
      });
    }

    return result;
  }

  getCourse(courseId: string): Promise<Course>;
  getCourse(courseId: string, userId: string): Promise<Course>;
  async getCourse(courseId: string, userId?: string): Promise<Course> {
    let result: Course = null;
    if (userId) {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
          attendees: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          attendees: true,
        },
      });
    } else {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          attendees: true,
        },
      });
    }

    if (!result) {
      throw new BadRequestException('not found course');
    }

    return result;
  }

  async createCourse(course: UpsertCourseDto, userId: string): Promise<Course> {
    const result = await this._prismaService.course.create({
      data: {
        ...course,
        attendees: {
          create: {
            userId: userId,
            role: UserCourseRole.HOST,
          },
        },
      },
    });

    return result;
  }

  async updateCourse(
    courseId: string,
    course: UpsertCourseDto,
  ): Promise<Course> {
    const result = await this._prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...course,
      },
    });

    return result;
  }

  async deleteCourse(courseId: string): Promise<Course> {
    const result = await this._prismaService.course.delete({
      where: {
        id: courseId,
      },
    });

    return result;
  }
}
