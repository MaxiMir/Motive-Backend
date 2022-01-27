import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { TopicDirectory } from 'src/abstracts/topicDictionary';

export class CreateTopicDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 21,
  })
  readonly dayId: number;

  @IsString()
  @MinLength(5)
  @MaxLength(500)
  @ApiProperty({
    example: 'What other books have you read?',
  })
  readonly message: string;

  @IsEnum(TopicDirectory)
  type: TopicDirectory;
}
