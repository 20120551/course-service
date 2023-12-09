import { IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { defaultValue } from 'utils/decorator/parameters';

export class UpsertCourseDto {
  @IsOptional()
  userId?: string;
  @IsString()
  name: string;
  @IsString()
  desc: string;
  @defaultValue(uuidv4().split('-')[0].toUpperCase())
  code: string;
}
