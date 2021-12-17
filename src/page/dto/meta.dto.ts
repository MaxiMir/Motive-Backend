import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly title: string;

  @ApiProperty({
    example: 'See how Maxim Minchenko (@maximir) accomplishes his goals',
  })
  readonly description: string;

  @ApiProperty({
    example: 'https://bebetter/maximir',
  })
  readonly url: string;

  @ApiProperty({
    example: 'user page',
  })
  readonly type: string;
}
