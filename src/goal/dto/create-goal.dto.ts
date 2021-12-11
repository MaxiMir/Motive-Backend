import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { IsArray, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @IsString()
  @Length(5, 32)
  @ApiProperty({
    example: 'learn French',
    description: 'name',
  })
  readonly name: string;

  @IsString()
  @Length(0, 255)
  @ApiProperty({
    example: '#foreignLanguage #knowledge #learnFrench #immigration',
    description: 'hashtags',
  })
  readonly hashtags: string;

  @IsArray()
  @ApiProperty({ type: CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
