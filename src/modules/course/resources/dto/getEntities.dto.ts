import { defaultValue, parseInt } from 'utils/decorator/parameters';

class FilterDto {
  @defaultValue(10, {
    filter: (obj) => obj.take === 0,
  })
  @parseInt()
  take?: number;

  @defaultValue(0)
  @parseInt()
  skip?: number;
}

export class GetCourseFilterDto extends FilterDto {}

export class AdminCourseFilterDto extends FilterDto {
  userId: string;
}
export class GetInvitationFilterDto extends FilterDto {}
