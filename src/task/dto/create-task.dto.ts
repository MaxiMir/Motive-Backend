import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @Length(5, 255)
  @ApiProperty({
    example: 'read 20 pages Harry Potter',
    description: 'name',
  })
  readonly name: string;

  @IsString()
  @Length(24, 24)
  @ApiProperty({
    example: '2021-12-03T00:00:00.000Z',
    description: 'date',
  })
  readonly date?: string;
}
