import { IsOptional, IsString } from 'class-validator';
import crypto from 'crypto';
import { defaultValue } from 'utils/decorator/parameters';
import { v4 as uuidv4 } from 'uuid';

export class UpsertCourseDto {
  @IsOptional()
  userId?: string;
  @IsOptional()
  name: string;
  @IsOptional()
  desc: string;
}

export class CreateCourseDto extends UpsertCourseDto {
  @defaultValue(uuidv4)
  id: string;
  @defaultValue(() => crypto.randomBytes(4).toString('hex').toUpperCase())
  code: string;
  @defaultValue(
    'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  )
  background: string;
  @defaultValue(true)
  isActive: boolean;
}

export class AdminUpsertCourseDto extends UpsertCourseDto {
  isActive?: boolean;
}
