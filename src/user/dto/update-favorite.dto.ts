import { IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFollowingDto {
  @IsIn(['add', 'remove'])
  @ApiProperty({
    example: 'add',
  })
  readonly op: string;

  @IsNumber()
  @ApiProperty({
    example: 2,
  })
  readonly following: number;
}
