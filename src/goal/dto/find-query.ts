import { IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsNull, Not } from 'typeorm';
import { Pagination } from 'src/abstracts/pagination';

export class FindQuery extends Pagination {
  @IsObject()
  @Transform(
    ({ value }) => ({ owner: +value.owner, ...(value.confirmation && { confirmation: Not(IsNull()) }) }),
    {
      toClassOnly: true,
    },
  )
  @Type(() => Object)
  where: { owner: number; confirmation: boolean };
}
