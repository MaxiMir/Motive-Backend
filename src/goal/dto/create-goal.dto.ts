import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

export class CreateGoalDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(5, 32)
  @ApiProperty({
    example: 'learn French',
  })
  readonly name: string;

  @IsString()
  @IsDateString()
  readonly started: string;

  @IsArray()
  @ArrayMaxSize(100)
  @Transform(
    ({ value }) =>
      value
        .toLowerCase()
        .split(' ')
        .map((v) => v.replace(/[^a-z\d]/g, ''))
        .filter(Boolean),
    { toClassOnly: true },
  )
  @Type(() => String)
  @ApiProperty({
    example: ['foreignLanguage, knowledge, learnFrench, immigration'],
  })
  readonly hashtags: string[];

  @IsArray()
  @ArrayMaxSize(100)
  @Transform(({ value }) => value.map((v) => v.trim()).filter(Boolean), { toClassOnly: true })
  @Type(() => String)
  @ApiProperty({
    example: ['Develop basic functionality', 'Alpha testing', 'Production release'],
  })
  readonly stages: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: () => CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
