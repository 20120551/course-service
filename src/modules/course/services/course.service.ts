import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import Stream from 'stream';
import { PrismaService } from 'utils/prisma';
import {
  UpsertCourseDto,
  GetCourseFilterDto,
  UploadFileDto,
  CreateCourseDto,
} from '../resources/dto';
import { IFirebaseStorageService } from 'utils/firebase';
import { UserResponse } from 'guards';
import { isEmpty, partition } from 'lodash';
import {
  CourseResponse,
  StudentCourseResponse,
  StudentCourseTemplateResponse,
} from '../resources/response';
import crypto from 'crypto';
import { InvitationState, PrismaClient, UserCourseRole } from '@prisma/client';
import * as studentImportTemplate from 'templates/student-import.xlsx';

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
    course: CreateCourseDto,
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

  downloadStudentListTemplate(): Promise<StudentCourseTemplateResponse>;
  updateStudentList(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<StudentCourseResponse[]>;
}

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    private readonly _prisma: PrismaClient,
    private readonly _prismaService: PrismaService,
    @Inject(IFirebaseStorageService)
    private readonly _firebaseStorageService: IFirebaseStorageService,
  ) {}

  async downloadStudentListTemplate(): Promise<StudentCourseTemplateResponse> {
    const buffer = await fs.promises.readFile(
      path.join(__dirname, studentImportTemplate.default),
    );
    return {
      buffer,
      fileName: 'student-import.xlsx',
      ext: 'xlsx',
    };
  }

  async updateStudentList(
    courseId: string,
    uploadFileDto: UploadFileDto,
  ): Promise<StudentCourseResponse[]> {
    const stream = Stream.Readable.from(uploadFileDto.buffer);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.read(stream);

    const worksheet = workbook.getWorksheet(1);
    const headers = worksheet.getRow(1);
    if (
      headers.getCell(1).value !== 'StudentId' ||
      headers.getCell(2).value !== 'FullName'
    ) {
      throw new BadRequestException(
        `cannot handle this template, please download template of system to grant access`,
      );
    }

    const students = [];
    worksheet.eachRow((row) => {
      const studentId = row.getCell(1).value.toString();
      const fullname = row.getCell(2).value.toString();

      if (studentId.match(/([A-Za-z_\\-\\.])+/i)) {
        return;
      }

      students.push({
        studentId,
        fullname,
      });
    });

    console.log(students);
    await this._prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        students: JSON.stringify(students),
      },
    });

    return students;
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
        skip: courseFilter.skip,
        take: courseFilter.take,
        where: {
          userCourses: {
            some: {
              userId: user.userId,
            },
          },
        },
        include: {
          userCourses: {
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
            include: {
              user: true,
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
      result = result.map((course) => {
        const { userCourses, ...payload } = course;
        let [host, attendee] = partition(
          userCourses,
          (attendee) => attendee.role === UserCourseRole.HOST,
        );

        if (isEmpty(attendee)) {
          attendee = host;
        }

        const { user: attendeeUser, ...attendeePayload } = attendee[0];
        const { user: hostUser, ...hostPayload } = host[0];

        return {
          ...payload,
          host: { ...hostUser, ...hostPayload },
          profile: { ...attendeeUser, ...attendeePayload },
        };
      });
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
          userCourses: {
            some: {
              userId: user.userId,
            },
          },
        },
        include: {
          userCourses: {
            include: {
              user: true,
            },
          },
          invitations: true,
        },
      });
    } else {
      result = await this._prismaService.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          userCourses: {
            include: {
              user: true,
            },
          },
          invitations: true,
        },
      });
    }

    if (!result) {
      throw new BadRequestException('not found course');
    }

    const { userCourses, invitations, ...payload } = result;
    const [host, _attendees] = partition(
      userCourses,
      (attendee) => attendee.role === UserCourseRole.HOST,
    );

    const notAlreadyAcceptedInvitations = invitations.filter(
      (invitation) => invitation.state !== InvitationState.ACCEPTED,
    );

    const responseAttendees = _attendees.map((attendee) => {
      const { user, ...payload } = attendee;
      return {
        ...payload,
        ...user,
      };
    });

    const { user: hostUser, ...hostPayload } = host[0];
    return {
      ...payload,
      attendees: responseAttendees,
      invitations: notAlreadyAcceptedInvitations,
      host: { ...hostUser, ...hostPayload },
    };
  }

  async createCourse(
    course: CreateCourseDto,
    user: UserResponse,
  ): Promise<CourseResponse> {
    console.log(course);
    let result = null;
    let attempt = 0;
    do {
      ++attempt;
      console.log(`current attempt ${attempt}`);
      const _course = await this._prismaService.course.findFirst({
        where: {
          code: course.code,
        },
      });

      if (_course) {
        course.code = crypto.randomBytes(4).toString('hex').toUpperCase();
        continue;
      }

      result = await this._prismaService.course.create({
        data: {
          ...course,
          userCourses: {
            create: {
              userId: user.userId,
              role: UserCourseRole.HOST,
            },
          },
        },
        include: {
          userCourses: true,
        },
      });
    } while (attempt < 10 && result === null);

    if (result === null) {
      throw new BadRequestException(
        'cannot create course because of duplicate code',
      );
    }

    const { userCourses, ...payload } = result;
    const { user: hostUser, ...hostPayload } = userCourses[0];

    return {
      ...payload,
      host: { ...hostPayload, ...hostUser },
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
}
