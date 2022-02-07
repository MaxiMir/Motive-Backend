import { ApiProperty } from '@nestjs/swagger';

export class GoalDayDto {
  @ApiProperty({
    example: 32,
    description: 'goal id',
  })
  readonly goalId: number;

  @ApiProperty({
    example: 412,
    description: 'day id',
  })
  readonly dayId: number;
}
