import { IsOptional } from 'class-validator';
import { parseInt } from 'utils/decorator/parameters';

class FilterDto {
  @IsOptional()
  @parseInt()
  take?: number;

  @IsOptional()
  @parseInt()
  skip?: number;
}

export class GetCourseFilterDto extends FilterDto {}
export class GetInvitationFilterDto extends FilterDto {}
