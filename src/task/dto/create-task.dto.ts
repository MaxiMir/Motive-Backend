import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @Length(5, 320)
  @ApiProperty({
    example: 'read 20 pages Harry Potter',
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @Length(24, 24)
  @ApiPropertyOptional({
    example: '2021-12-03T00:00:00.000Z',
  })
  readonly date: string;
}
