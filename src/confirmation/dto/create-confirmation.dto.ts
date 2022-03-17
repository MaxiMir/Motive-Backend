import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsOptional()
  @MaxLength(500)
  @ApiPropertyOptional({
    example: 'It was not just...',
  })
  readonly text?: string;
}
