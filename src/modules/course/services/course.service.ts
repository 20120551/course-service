import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  UpsertCourseDto,
  GetCourseFilterDto,
  UploadFileDto,
} from '../resources/dto';
import BPromise from 'bluebird';
import { Course, UserCourseRole } from 'utils/prisma/client';
import { IFirebaseStorageService } from 'utils/firebase';
import { UserResponse } from 'guards';
import { Auth0ModuleOptions, IAuth0Service } from 'utils/auth0';
import axios, { AxiosInstance } from 'axios';
import { isEmpty, partition } from 'lodash';
import { CourseResponse } from '../resources/response';

export const ICourseService = 'ICourseService';

export interface ICourseService {
  getCourses(courseFilter: GetCourseFilterDto): Promise<CourseResponse[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    user: UserResponse,
  ): Promise<CourseResponse[]>;

  getCourse(courseId: string): Promise<CourseResponse>;
  getCourse(courseId: string, user: UserResponse): Promise<CourseResponse>;

  createCourse(
    course: UpsertCourseDto,
    user: UserResponse,
  ): Promise<CourseResponse>;
  updateCourse(
    courseId: string,
    course: UpsertCourseDto,
  ): Promise<CourseResponse>;
  deleteCourse(courseId: string): Promise<CourseResponse>;

  uploadCourseBackground(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<CourseResponse>;
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
  ): Promise<CourseResponse> {
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

  getCourses(courseFilter: GetCourseFilterDto): Promise<CourseResponse[]>;
  getCourses(
    courseFilter: GetCourseFilterDto,
    user: UserResponse,
  ): Promise<CourseResponse[]>;
  async getCourses(
    courseFilter: GetCourseFilterDto,
    user?: UserResponse,
  ): Promise<CourseResponse[]> {
    let result = [];
    if (user) {
      result = await this._prismaService.course.findMany({
        ...courseFilter,
        where: {
          attendees: {
            some: {
              userId: user.userId,
            },
          },
        },
        include: {
          attendees: {
            where: {
              OR: [
                {
                  role: UserCourseRole.HOST,
                },
                {
                  userId: user.userId,
                },
              ],
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
          let [host, attendee] = partition(
            attendees,
            (attendee) => attendee.role === UserCourseRole.HOST,
          );

          if (isEmpty(attendee)) {
            attendee = host;
          }

          const res = await this._auth0Client.get(
            `/api/v2/users/${host[0].userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          return {
            ...payload,
            host: { ...host[0], ...res.data },
            profile: { ...attendee[0], ...(user || {}) },
          };
        },
        {
          concurrency: 10,
        },
      );
    }

    return result;
  }

  getCourse(courseId: string): Promise<CourseResponse>;
  getCourse(courseId: string, user: UserResponse): Promise<CourseResponse>;
  async getCourse(
    courseId: string,
    user?: UserResponse,
  ): Promise<CourseResponse> {
    let result = null;
    if (user) {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
          attendees: {
            some: {
              userId: user.userId,
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
    const { attendees, ...payload } = result;
    return {
      ...payload,
      host: { ...attendees[0], ...(user || {}) },
    };
  }

  async createCourse(
    course: UpsertCourseDto,
    user: UserResponse,
  ): Promise<CourseResponse> {
    let result = null;
    result = await this._prismaService.course.create({
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
      include: {
        attendees: true,
      },
    });

    const { attendees, ...payload } = result;
    return {
      ...payload,
      host: { ...attendees[0], ...user },
    };
  }

  async updateCourse(
    courseId: string,
    course: UpsertCourseDto,
  ): Promise<CourseResponse> {
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

  async deleteCourse(courseId: string): Promise<CourseResponse> {
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
