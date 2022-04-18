import { IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Pagination } from 'src/abstracts/pagination';

export class FindQueryDto extends Pagination {
  @IsObject()
  @Type(() => Object)
  where: { user: string };
}
