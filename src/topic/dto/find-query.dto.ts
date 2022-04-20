import { IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Pagination } from 'src/common/pagination';

export class FindQueryDto extends Pagination {
  @IsObject()
  @Transform(({ value }) => ({ day: +value.day }), {
    toClassOnly: true,
  })
  @Type(() => Object)
  where: { day: number };
}
