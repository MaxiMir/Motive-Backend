import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFollowingDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
  })
  readonly following: number;
}
