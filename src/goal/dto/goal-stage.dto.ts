import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class GoalStageDto {
  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty({
    example: 2,
  })
  readonly stage: number;
}
