import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty({
    example: 'What other books have you read?',
  })
  readonly text: string;
}
