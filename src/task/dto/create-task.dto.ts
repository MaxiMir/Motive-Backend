import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
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
  readonly date?: string;
}
