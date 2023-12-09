import { Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import { UpsertCourseDto, GetCourseFilterDto } from '../resources/dto';
import { Course, UserCourseRole } from 'utils/prisma/client';

export const ICourseService = 'ICourseService';
export interface ICourseService {
  getCourses(courseFilter: GetCourseFilterDto): Promise<Course[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<Course[]>;

  getCourse(courseId: string): Promise<Course>;
  getCourse(courseId: string, userId: string): Promise<Course>;

  createCourse(course: UpsertCourseDto, userId: string): Promise<Course>;
  updateCourse(courseId: string, course: UpsertCourseDto): Promise<Course>;
  deleteCourse(courseId: string): Promise<Course>;
}

@Injectable()
export class CourseService implements ICourseService {
  constructor(private readonly _prismaService: PrismaService) {}
  getCourses(courseFilter: GetCourseFilterDto): Promise<Course[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<Course[]>;
  async getCourses(
    courseFilter: GetCourseFilterDto,
    userId?: string,
  ): Promise<Course[]> {
    let result: Course[] = [];
    if (userId) {
      result = await this._prismaService.course.findMany({
        skip: courseFilter.skip,
        take: courseFilter.take,
        where: {
          attendees: {
            some: {
              userId: userId,
            },
          },
        },
      });
    } else {
      result = await this._prismaService.course.findMany({
        skip: courseFilter.skip,
        take: courseFilter.take,
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
