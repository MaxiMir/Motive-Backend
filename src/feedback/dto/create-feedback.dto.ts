import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFeedbackDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 21,
  })
  readonly dayID: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiPropertyOptional({
    example: 'It was a tough day...',
  })
  readonly text?: string;
}
