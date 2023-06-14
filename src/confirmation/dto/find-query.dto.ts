import { IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationDto } from 'src/common/pagination.dto';

export class FindQueryDto extends PaginationDto {
  @IsObject()
  @Transform(({ value }) => ({ user: +value.user }))
  @Type(() => Object)
  readonly where: { user: number };
}
