import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
  })
  readonly nickname: string;
}
