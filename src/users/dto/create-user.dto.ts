import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  readonly id: string;

  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  readonly name: string;

  @ApiProperty({
    example: '/images/4du4de.png',
    description: 'server path to avatar image',
  })
  readonly avatar: string;
}
