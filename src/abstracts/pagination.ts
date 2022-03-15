import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Pagination {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;
}
