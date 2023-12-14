import { IsOptional, IsString } from 'class-validator';
import crypto from 'crypto';
import { defaultValue } from 'utils/decorator/parameters';
import { v4 as uuidv4 } from 'uuid';

export class UpsertCourseDto {
  @IsOptional()
  userId?: string;
  @IsString()
  name: string;
  @IsString()
  desc: string;
  @defaultValue(() => crypto.randomBytes(4).toString('hex').toUpperCase())
  code: string;
}

export class CreateCourseDto extends UpsertCourseDto {
  @defaultValue(uuidv4)
  id: string;
}
