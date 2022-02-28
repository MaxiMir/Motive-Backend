import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsString } from 'class-validator';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

export class CreateDayDto {
  @IsString()
  @IsDateString()
  readonly date: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: () => CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
