import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCompletedDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiPropertyOptional({
    example: 'It was not just...',
  })
  readonly text?: string;
}
