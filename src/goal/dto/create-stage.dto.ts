import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStageDto {
  @IsString()
  @Length(5, 32)
  @ApiProperty({
    example: 'Develop basic functionality',
  })
  readonly name: string;
}
