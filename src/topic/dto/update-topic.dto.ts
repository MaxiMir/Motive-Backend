import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTopicDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(1, 500)
  @ApiProperty({
    example: 'What other books have you read?',
  })
  readonly text: string;
}
