import { IsEmail, IsString } from 'class-validator';
import { defaultValue } from 'utils/decorator/parameters';
import { InvitationState } from 'utils/prisma/client';
import { UserCourseRole } from 'utils/prisma/client';

export class BatchInvitationDto {
  @IsEmail()
  email: string;
}

export class CreateInvitationDto extends BatchInvitationDto {
  id?: string;
  @defaultValue(InvitationState.PROCESSING)
  state: InvitationState;
  @defaultValue(UserCourseRole.STUDENT)
  role: UserCourseRole;
}

export class UpdateInvitationDto {
  @IsString()
  id: string;
  state: InvitationState;
}

export class DeleteInvitationDto {
  id: string;
}
