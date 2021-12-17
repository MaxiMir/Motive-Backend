import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { ArrayMinSize, IsArray, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @IsString()
  @Length(5, 32)
  @ApiProperty({
    example: 'learn French',
  })
  readonly name: string;

  @IsArray()
  @ApiProperty({
    example: ['foreignLanguage', 'knowledge', 'learnFrench', 'immigration'],
  })
  readonly hashtags: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
