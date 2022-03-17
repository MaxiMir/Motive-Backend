import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMemberDto {
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 32,
    description: 'goal id',
  })
  readonly goalId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 412,
    description: 'day id',
  })
  readonly dayId: number;
}