import { InvitationState } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { defaultValue } from 'utils/decorator/parameters';

export class BatchInvitationDto {
  @IsEmail()
  email: string;
}

export class CreateInvitationDto extends BatchInvitationDto {
  @defaultValue(InvitationState.PROCESSING)
  state: InvitationState;
}

export class UpdateInvitationDto {
  @IsString()
  id: string;
  state: InvitationState;
}

export class DeleteInvitationDto extends BatchInvitationDto {}
