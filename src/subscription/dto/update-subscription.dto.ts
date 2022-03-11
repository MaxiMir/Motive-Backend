import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'user id',
  })
  readonly userId: number;
}
