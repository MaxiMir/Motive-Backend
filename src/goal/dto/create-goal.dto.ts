import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsEnum, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { SphereDto } from 'src/user-characteristic/dto/sphere.dto';
import { CreateStageDto } from './create-stage.dto';

export class CreateGoalDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(5, 32)
  @ApiProperty({
    example: 'learn French',
  })
  readonly name: string;

  @IsEnum(SphereDto)
  readonly sphere: SphereDto;

  @IsString()
  @IsDateString()
  readonly started: string;

  @IsArray()
  @ArrayMaxSize(100)
  @Transform(({ value }) =>
    value
      .toLowerCase()
      .split(' ')
      .map((v) => v.replace(/[^a-z\d]/g, ''))
      .filter(Boolean),
  )
  @Type(() => String)
  @ApiProperty({
    example: ['foreignLanguage, knowledge, learnFrench, immigration'],
  })
  readonly hashtags: string[];

  @IsArray()
  @ArrayMaxSize(100)
  @Transform(({ value }) => value.map((v) => v.name.trim()).filter(Boolean))
  @Type(() => CreateStageDto)
  @ApiProperty({
    example: ['Develop basic functionality', 'Alpha testing', 'Production release'],
  })
  readonly stages: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: () => CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
