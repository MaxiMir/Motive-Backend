import { IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TaskPriorityDto } from 'src/task/entities/task-priority.dto';

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(5, 320)
  @ApiProperty({
    example: 'read 20 pages Harry Potter',
  })
  readonly name: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @MaxLength(500)
  @ApiPropertyOptional({
    example: 'Live in one of the most creative neighborhoods and get a taste of the local vibes',
  })
  readonly description?: string;

  @IsEnum(TaskPriorityDto)
  @IsOptional()
  readonly priority: TaskPriorityDto;

  @IsString()
  @IsOptional()
  @Length(24, 24)
  @ApiPropertyOptional({
    example: '2021-12-03T00:00:00.000Z',
  })
  readonly date?: string;
}
