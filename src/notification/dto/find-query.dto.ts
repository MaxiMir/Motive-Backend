import { IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Pagination } from 'src/common/pagination';

export class FindQueryDto extends Pagination {
  @IsObject()
  @Type(() => Object)
  where: { recipient: string };
}
