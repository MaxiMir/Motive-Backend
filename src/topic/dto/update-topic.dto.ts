import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTopicDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty({
    example: 'What other books have you read?',
  })
  readonly text: string;
}
