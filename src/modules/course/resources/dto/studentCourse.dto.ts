import { IsString } from 'class-validator';

export class UpdateStudentCardDto {
  studentId: string;
  name: string;
  birthday: string;
  cardExpiration: string;
  department: string;
  degree: string;
  universityName: string;
}

export class UploadStudentCardDto {
  buffer: Buffer;
  @IsString()
  filename: string;
  mimeType: string;
}
