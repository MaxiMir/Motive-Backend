import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsOptional()
  @Length(3, 256)
  @ApiProperty({
    example: 'It was a tough day...',
  })
  readonly text: string;
}
