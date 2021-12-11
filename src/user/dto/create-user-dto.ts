import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  readonly id: string;

  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  readonly name: string;
}
