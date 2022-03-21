import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly name: string;

  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
  })
  readonly nickname: string;
}
