import { IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Pagination } from 'src/abstracts/pagination';

export class FindQuery extends Pagination {
  @IsObject()
  @Type(() => Object)
  where: { email?: string; name?: string };
}
