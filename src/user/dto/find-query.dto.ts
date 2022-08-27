import { IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/pagination.dto';

export class FindQueryDto extends PaginationDto {
  @IsObject()
  @Type(() => Object)
  readonly where: { email?: string; name?: string };
}
