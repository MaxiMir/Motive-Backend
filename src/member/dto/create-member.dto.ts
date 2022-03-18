import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMemberDto {
  @IsString()
  @IsDateString()
  readonly started: string;

  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 32,
    description: 'goal id',
  })
  readonly goalId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 412,
    description: 'day id',
  })
  readonly dayId?: number;
}
