import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Pagination {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip: number;
}
