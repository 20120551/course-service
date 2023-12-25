import { IsString } from 'class-validator';

export class UpdateStudentCardDto {
  buffer: Buffer;
  @IsString()
  filename: string;
  mimeType: string;
}
