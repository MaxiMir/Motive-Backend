import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateFeedbackDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 21,
  })
  readonly dayId: number;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @MaxLength(1000)
  @ApiPropertyOptional({
    example: 'It was a tough day...',
  })
  readonly text?: string;
}
