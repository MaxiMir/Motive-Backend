import { ApiProperty } from '@nestjs/swagger';

export class CalendarDto {
  @ApiProperty({
    example: 1,
    description: 'day identifier',
  })
  readonly id: number;

  @ApiProperty({
    example: '2021-08-15 00:00:00.000000+07',
    description: 'day date',
  })
  readonly date: string;
}
