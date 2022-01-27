import { IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Pagination } from 'src/abstracts/pagination';

export class FindQuery extends Pagination {
  @IsObject()
  @Transform(({ value }) => ({ day: +value.day }), {
    toClassOnly: true,
  })
  @Type(() => Object)
  where: { day: number };
}
