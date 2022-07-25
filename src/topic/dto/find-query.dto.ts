import { IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationDto } from 'src/common/pagination.dto';

export class FindQueryDto extends PaginationDto {
  @IsObject()
  @Transform(({ value }) => ({ day: +value.day }), {
    toClassOnly: true,
  })
  @Type(() => Object)
  where: { day: number };
}
