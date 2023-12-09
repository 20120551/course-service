import { IsOptional } from 'class-validator';
import { parseInt } from 'utils/decorator/parameters';

export class GetCourseFilterDto {
  @IsOptional()
  @parseInt()
  take?: number;

  @IsOptional()
  @parseInt()
  skip?: number;
}
