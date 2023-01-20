import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateConfirmationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 32,
    description: 'goal id',
  })
  readonly goalId: number;

  @IsString()
  @IsDateString()
  readonly end: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @MaxLength(1000)
  @ApiPropertyOptional({
    example: 'It was not just...',
  })
  readonly text?: string;
}
