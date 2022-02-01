import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, Length } from 'class-validator';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Transform, Type } from 'class-transformer';

export class CreateGoalDto {
  @IsString()
  @Length(5, 32)
  @ApiProperty({
    example: 'learn French',
  })
  readonly name: string;

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
  readonly map: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: () => CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
