import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

export class CreateDayDto {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: () => CreateTaskDto, isArray: true })
  readonly tasks: CreateTaskDto[];
}
