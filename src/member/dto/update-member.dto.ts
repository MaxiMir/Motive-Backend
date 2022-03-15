import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMemberDto {
  @IsString()
  @IsDateString()
  readonly lastEndOfDay: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 412,
    description: 'day id',
  })
  readonly dayId: number;
}
