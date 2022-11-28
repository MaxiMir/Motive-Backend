import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateStageDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(5, 320)
  @ApiProperty({
    example: 'Develop basic functionality',
  })
  readonly name: string;
}
