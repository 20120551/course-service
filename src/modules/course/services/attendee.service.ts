import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma';
import {
  CreateAttendeeByCodeDto,
  CreateAttendeeByTokenDto,
  SwitchAttendeeRoleDto,
  UpdateStudentCardDto,
  UploadStudentCardDto,
} from '../resources/dto';
import { ICryptoJSService } from 'utils/hash/cryptojs';
import { UserResponse } from 'guards';
import { CourseResponse, StudentCourseResponse } from '../resources/response';
import {
  InvitationState,
  PrismaClient,
  StudentCard,
  UserCourseRole,
} from '@prisma/client';
import { AzureOcrStudentCardResponse, IAzureOcrService } from 'utils/ocr/azure';
import { IFirebaseStorageService } from 'utils/firebase';
import {
  createCamelCaseFromObject,
  createSnakeCaseFromObject,
} from 'utils/request';
import { v4 as uuidv4 } from 'uuid';
export const IAttendeeService = 'IAttendeeService';

export interface IAttendeeService {
  switchAttendeeRole(
    courseId: string,
    user: UserResponse,
    switchAttendeeRoleDto: SwitchAttendeeRoleDto,
  ): Promise<void>;

  leaveCourse(courseId: string, userId: string): Promise<void>;

  addAttendeeToCourseByCode(
    user: UserResponse,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<CourseResponse>;

  addAttendeeToCourseByToken(
    user: UserResponse,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<CourseResponse>;

  getStudentCards(userId: string): Promise<StudentCard>;
  uploadUserStudentCard(
    courseId: string,
    user: UserResponse,
    uploadUserStudentCardDto: UploadStudentCardDto,
  ): Promise<StudentCard>;

  updateUserStudentCard(
    cardId: string,
    userId: string,
    updateUserStudentCardDto: UpdateStudentCardDto,
  ): Promise<StudentCard>;

  deleteUserStudentCard(cardId: string): Promise<void>;
}

@Injectable()
export class AttendeeService implements IAttendeeService {
  constructor(
    private readonly _prisma: PrismaClient,
    private readonly _prismaService: PrismaService,
    @Inject(ICryptoJSService)
    private readonly _cryptoJSService: ICryptoJSService,
    @Inject(IAzureOcrService)
    private readonly _azureOcrService: IAzureOcrService,
    @Inject(IFirebaseStorageService)
    private readonly _firebaseStorageService: IFirebaseStorageService,
  ) {}

  async deleteUserStudentCard(cardId: string): Promise<void> {
    await this._prismaService.studentCard.delete({
      where: {
        id: cardId,
      },
    });
  }

  async getStudentCards(userId: string): Promise<StudentCard> {
    const { studentCard } = await this._prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        studentCard: true,
      },
    });

    return studentCard;
  }

  async updateUserStudentCard(
    cardId: string,
    userId: string,
    updateStudentCardDto: UpdateStudentCardDto,
  ): Promise<StudentCard> {
    const userCard = await this._prismaService.studentCard.update({
      where: {
        id: cardId,
        userId,
      },
      data: updateStudentCardDto,
    });

    return userCard;
  }

  // check student id in course
  async uploadUserStudentCard(
    courseId: string,
    user: UserResponse,
    uploadUserStudentCardDto: UploadStudentCardDto,
  ): Promise<StudentCard> {
    const { buffer, filename } = uploadUserStudentCardDto;
    const { students } = await this._prismaService.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        students: true,
      },
    });

    const studentLists = JSON.parse(students.toString()).map(
      (student: StudentCourseResponse) =>
        createSnakeCaseFromObject({
          studentId: student.studentId,
          name: student.fullname,
        }),
    );

    const pollData =
      await this._azureOcrService.poll<AzureOcrStudentCardResponse>(
        buffer,
        studentLists,
      );

    const studentCard = await this._prismaService.studentCard.findFirst({
      where: {
        userId: user.userId,
        studentId: pollData.student_id,
      },
    });

    if (studentCard) {
      return createCamelCaseFromObject(studentCard);
    }

    const cardBucket = `cards/${uuidv4()}-${filename}`;
    await this._firebaseStorageService.upload(buffer, cardBucket);
    const url = await this._firebaseStorageService.get(cardBucket);

    const studentCardCreated = await this._prisma.$transaction(
      async (context) => {
        const studentCardCreated = await context.studentCard.create({
          data: {
            userId: user.userId,
            ...createCamelCaseFromObject<
              AzureOcrStudentCardResponse,
              StudentCard
            >(pollData),
            studentCardImage: url,
          },
        });
        return studentCardCreated;
      },
      {
        timeout: 10000,
      },
    );

    return studentCardCreated;
  }

  async switchAttendeeRole(
    courseId: string,
    user: UserResponse,
    switchAttendeeRoleDto: SwitchAttendeeRoleDto,
  ): Promise<void> {
    if (user.userId === switchAttendeeRoleDto.attendeeId) {
      throw new BadRequestException('cannot be switch your own role');
    }

    const attendee = await this._prismaService.userCourse.findFirst({
      where: {
        courseId,
        userId: switchAttendeeRoleDto.attendeeId,
      },
    });

    if (!attendee) {
      throw new BadRequestException('Not found attendee');
    }

    // switch to host
    if (switchAttendeeRoleDto.role === UserCourseRole.HOST) {
      await this._prisma.$transaction(
        async (context) => {
          await context.userCourse.update({
            where: {
              userId_courseId: {
                userId: user.userId,
                courseId,
              },
            },
            data: {
              role: UserCourseRole.TEACHER,
            },
          });

          await context.userCourse.update({
            where: {
              userId_courseId: {
                userId: attendee.userId,
                courseId,
              },
            },
            data: {
              role: UserCourseRole.HOST,
            },
          });
        },
        {
          maxWait: 5000,
          timeout: 10000,
        },
      );
    } else {
      await this._prismaService.userCourse.update({
        where: {
          userId_courseId: {
            userId: attendee.userId,
            courseId,
          },
        },
        data: {
          role: switchAttendeeRoleDto.role,
        },
      });
    }
  }

  async addAttendeeToCourseByCode(
    user: UserResponse,
    createAttendeeByCodeDto: CreateAttendeeByCodeDto,
  ): Promise<CourseResponse> {
    const course = await this._prismaService.course.findFirst({
      where: {
        code: createAttendeeByCodeDto.code,
      },
      include: {
        userCourses: {
          where: {
            role: UserCourseRole.HOST,
          },
        },
      },
    });

    if (!course) {
      throw new BadRequestException('not found course with code');
    }

    const attendee = await this._prismaService.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.userId,
          courseId: course.id,
        },
      },
    });

    // joined
    if (attendee) {
      const res = await this._getCourseResponse(course, user);
      return res;
    }

    const result = await this._prismaService.course.update({
      where: {
        id: course.id,
      },
      data: {
        userCourses: {
          create: {
            userId: user.userId,
            role: UserCourseRole.STUDENT,
          },
        },
      },
      include: {
        userCourses: {
          where: {
            role: UserCourseRole.HOST,
          },
          include: {
            user: true,
          },
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        `not found course with code ${createAttendeeByCodeDto.code}`,
      );
    }

    const res = this._getCourseResponse(result, user);
    return res;
  }

  async addAttendeeToCourseByToken(
    user: UserResponse,
    createAttendeeByTokenDto: CreateAttendeeByTokenDto,
  ): Promise<CourseResponse> {
    const decrypt = this._cryptoJSService.decrypt<{
      id: string;
    }>(createAttendeeByTokenDto.token.replaceAll(' ', '+'));

    const invitation = await this._prismaService.invitation.findUnique({
      where: {
        id: decrypt.id,
      },
    });

    if (!invitation) {
      throw new BadRequestException('not found invitation');
    }

    const result = await this._prismaService.course.update({
      where: {
        id: invitation.courseId,
      },
      data: {
        userCourses: {
          create: {
            userId: user.userId,
            role: invitation.role,
            invitationId: invitation.id,
          },
        },
        invitations: {
          update: {
            where: {
              id: invitation.id,
            },
            data: {
              state: InvitationState.ACCEPTED,
            },
          },
        },
      },
      include: {
        userCourses: {
          where: {
            role: UserCourseRole.HOST,
          },
          include: {
            user: true,
          },
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        `not found course with token ${createAttendeeByTokenDto.token}`,
      );
    }

    const res = this._getCourseResponse(result, user);
    return res;
  }

  async leaveCourse(courseId: string, userId: string): Promise<void> {
    const attendee = await this._prismaService.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId,
        },
      },
    });

    if (!attendee) {
      throw new BadRequestException(`not found user ${userId} in course`);
    }

    if (attendee.role === UserCourseRole.HOST) {
      await this._prismaService.course.delete({
        where: {
          id: courseId,
        },
      });
    } else {
      await this._prismaService.userCourse.delete({
        where: {
          userId_courseId: {
            userId: userId,
            courseId,
          },
        },
      });
    }
  }

  private _getCourseResponse(course: any, user: UserResponse) {
    const { userCourses, ...payload } = course;

    return {
      ...payload,
      host: {
        ...userCourses[0],
        ...userCourses[0].user,
      },
      profile: {
        ...user,
      },
    };
  }
}
