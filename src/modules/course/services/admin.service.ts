import { BadRequestException, Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';
import { PrismaService } from 'utils/prisma';
import {
  StudentCourseTemplateResponse,
  studentUserMappingResponse,
} from '../resources/response';
import { UploadFileDto } from '../resources/dto';
import { Stream } from 'stream';
import { differenceBy } from 'lodash';
import { PrismaClient } from '@prisma/client';
import BPromise from 'bluebird';
import { streamToBuffer } from 'utils/file';

export const IAdminService = 'IAdminService';

export interface IAdminService {
  downloadMappingStudentId(): Promise<StudentCourseTemplateResponse>;
  uploadMappingStudentId(
    uploadFile: UploadFileDto,
  ): Promise<studentUserMappingResponse[]>;
}

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _prisma: PrismaClient,
  ) {}

  async downloadMappingStudentId(): Promise<StudentCourseTemplateResponse> {
    const users = await this._prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        studentCard: {
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!users) {
      throw new BadRequestException('empty user');
    }

    const stream = new Stream.PassThrough();
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      stream,
    });

    const worksheet = workbook.addWorksheet('user');
    // HEADER
    const headers = [
      {
        name: 'UserId',
        width: 20,
      },
      {
        name: 'Email',
        width: 20,
      },
      {
        name: 'StudentId',
        width: 20,
      },
    ];

    worksheet.addRow(headers.map((header) => header.name));
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.alignment = {
        vertical: 'top',
        wrapText: true,
      };
      cell.font = {
        size: 11,
        bold: true,
      };
    });

    headerRow.commit();

    users.forEach((user, index) => {
      const cell1 = worksheet.getRow(index + 2).getCell(1);
      const cell2 = worksheet.getRow(index + 2).getCell(2);
      const cell3 = worksheet.getRow(index + 2).getCell(3);
      cell1.value = user.id;
      cell2.value = user.email;
      cell3.value = user.studentCard?.studentId || '';
    });

    worksheet.commit();
    workbook.commit();

    return {
      buffer: await streamToBuffer(stream),
      ext: 'xlsx',
      fileName: 'import-student.xlsx',
    };
  }

  async uploadMappingStudentId(
    uploadFile: UploadFileDto,
  ): Promise<studentUserMappingResponse[]> {
    const stream = Stream.Readable.from(uploadFile.buffer);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.read(stream);

    const worksheet = workbook.getWorksheet(1);
    const headers = worksheet.getRow(1);

    if (
      headers.getCell(1).value !== 'UserId' ||
      headers.getCell(2).value !== 'Email' ||
      headers.getCell(3).value !== 'StudentId'
    ) {
      throw new BadRequestException('not support this template');
    }

    const userStudents: studentUserMappingResponse[] = [];
    worksheet.eachRow((row) => {
      const userId = row.getCell(1).value.toString();
      const email = row.getCell(2).value.toString();
      const studentId = row.getCell(3).value.toString();
      if (studentId.match(/([A-Za-z_\\-\\.])+/i)) {
        return;
      }

      userStudents.push({
        userId,
        email,
        studentId,
      });
    });

    const userStudentCards = await this._prismaService.studentCard.findMany({
      select: {
        studentId: true,
        userId: true,
      },
    });

    const create = differenceBy(userStudents, userStudentCards, 'studentId');
    const update = userStudents.filter(
      (student) =>
        !create.some((create) => create.studentId === student.studentId),
    );

    await this._prisma.$transaction(
      async (context) => {
        const result = await context.studentCard.createMany({
          data: create.map((data) => ({
            userId: data.userId,
            studentId: data.studentId,
            name: data.email,
            birthday: '',
            cardExpiration: '',
            degree: '',
            department: '',
            universityName: '',
            studentCardImage: '',
          })),
        });

        await BPromise.mapSeries(update, async (data) => {
          await context.studentCard.update({
            where: {
              userId: data.userId,
            },
            data: {
              studentId: data.studentId,
            },
          });
        });

        return result;
      },
      {
        timeout: 10000,
      },
    );

    return userStudents;
  }
}
