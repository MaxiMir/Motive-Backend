import { IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Pagination } from 'src/abstracts/pagination';

export class FindQueryDto extends Pagination {
  @IsObject()
  @Transform(({ value }) => ({ user: +value.user }), {
    toClassOnly: true,
  })
  @Type(() => Object)
  where: { user: number };
}
