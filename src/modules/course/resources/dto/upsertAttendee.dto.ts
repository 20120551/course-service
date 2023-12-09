import { IsString } from 'class-validator';

export class CreateAttendeeByTokenDto {
  @IsString()
  token: string;
}

export class CreateAttendeeByCodeDto {
  @IsString()
  code: string;
}
