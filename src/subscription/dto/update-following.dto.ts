import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateFollowingDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'user id',
  })
  readonly id: number;
}
