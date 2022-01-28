import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { TopicDirectory } from 'src/abstracts/topic-base.entity';

export class CreateTopicDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 21,
  })
  readonly dayId: number;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty({
    example: 'What other books have you read?',
  })
  readonly text: string;

  @IsEnum(TopicDirectory)
  type: TopicDirectory;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiPropertyOptional({
    example: 45,
  })
  readonly answer: number;
}
