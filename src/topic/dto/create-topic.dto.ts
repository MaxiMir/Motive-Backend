import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { TopicTypeDto } from './topic-type.dto';
import { Transform } from 'class-transformer';

export class CreateTopicDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 21,
  })
  readonly dayId: number;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({
    example: 'What other books have you read?',
  })
  readonly text: string;

  @IsEnum(TopicTypeDto)
  readonly type: TopicTypeDto;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiPropertyOptional({
    example: 45,
  })
  readonly topicId?: number;
}
