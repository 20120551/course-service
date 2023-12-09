import { IsEmail, IsString } from 'class-validator';
import { defaultValue } from 'utils/decorator/parameters';
import { InvitationState } from 'utils/prisma/client';

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

export class DeleteInvitationDto {
  id: string;
}
