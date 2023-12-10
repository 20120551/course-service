import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  UpsertCourseDto,
  GetCourseFilterDto,
  UploadFileDto,
} from '../resources/dto';
import BPromise from 'bluebird';
import { Course, UserCourse, UserCourseRole } from 'utils/prisma/client';
import { IFirebaseStorageService } from 'utils/firebase';
import { UserResponse } from 'guards';
import { Auth0ModuleOptions, IAuth0Service } from 'utils/auth0';
import axios, { AxiosInstance } from 'axios';
import { isEmpty } from 'lodash';

export const ICourseService = 'ICourseService';

export interface ICourseService {
  getCourses(courseFilter: GetCourseFilterDto): Promise<Course[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<Course[]>;

  getCourse(courseId: string): Promise<Course>;
  getCourse(courseId: string, userId: string): Promise<Course>;

  createCourse(course: UpsertCourseDto, user: UserResponse): Promise<Course>;
  updateCourse(courseId: string, course: UpsertCourseDto): Promise<Course>;
  deleteCourse(courseId: string): Promise<Course>;

  uploadCourseBackground(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<Course>;
}

@Injectable()
export class CourseService implements ICourseService {
  private readonly _auth0Client: AxiosInstance;
  constructor(
    private readonly _prismaService: PrismaService,
    @Inject(IFirebaseStorageService)
    private readonly _firebaseStorageService: IFirebaseStorageService,
    @Inject(Auth0ModuleOptions) _auth0Options: Auth0ModuleOptions,
    @Inject(IAuth0Service)
    private readonly _auth0Service: IAuth0Service,
  ) {
    this._auth0Client = axios.create({
      baseURL: _auth0Options.baseUrl,
    });
  }

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

  getCourses(courseFilter: GetCourseFilterDto): Promise<Course[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    userId: string,
  ): Promise<Course[]>;
  async getCourses(
    courseFilter: GetCourseFilterDto,
    userId?: string,
  ): Promise<Course[]> {
    let result = [];
    if (userId) {
      result = await this._prismaService.course.findMany({
        ...courseFilter,
        where: {
          attendees: {
            some: {
              userId,
            },
          },
        },
        include: {
          attendees: {
            where: {
              role: UserCourseRole.HOST,
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

    if (!isEmpty(result)) {
      const token = await this._getToken();

      result = await BPromise.map(
        result,
        async (course) => {
          const { attendees, ...payload } = course;
          const res = await this._auth0Client.get(
            `/api/v2/users/${attendees[0].userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          return {
            ...payload,
            attendees: { ...attendees[0], ...res.data },
          };
        },
        {
          concurrency: 10,
        },
      );
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

  async createCourse(
    course: UpsertCourseDto,
    user: UserResponse,
  ): Promise<Course> {
    const result = await this._prismaService.course.create({
      data: {
        ...course,
        attendees: {
          create: {
            userId: user.userId,
            email: user.email,
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

  private async _getToken() {
    const { access_token } = await this._auth0Service.signToken();
    return access_token;
  }
}
