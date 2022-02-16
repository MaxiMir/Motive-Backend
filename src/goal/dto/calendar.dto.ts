import { ApiProperty } from '@nestjs/swagger';

export class CalendarDto {
  @ApiProperty({
    example: 1,
    description: 'day identifier',
  })
  readonly id: number;

  @ApiProperty({
    example: '2022-01-25',
    description: 'day date',
  })
  readonly date: string;
}
