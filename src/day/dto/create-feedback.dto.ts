import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsOptional()
  @MaxLength(256)
  @ApiPropertyOptional({
    example: 'It was a tough day...',
  })
  readonly text: string;
}