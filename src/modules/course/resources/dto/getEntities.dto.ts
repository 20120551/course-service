import { defaultValue, parseInt } from 'utils/decorator/parameters';

class FilterDto {
  @defaultValue(10)
  @parseInt()
  take?: number;

  @defaultValue(0)
  @parseInt()
  skip?: number;
}

export class GetCourseFilterDto extends FilterDto {}
export class GetInvitationFilterDto extends FilterDto {}
