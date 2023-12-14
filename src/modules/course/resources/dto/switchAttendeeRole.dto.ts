import { IsString } from 'class-validator';
import { UserCourseRole } from '@prisma/client';

export class SwitchAttendeeRoleDto {
  @IsString()
  attendeeId: string;
  role: UserCourseRole;
}
