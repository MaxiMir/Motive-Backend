import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavoriteDto {
  @IsNumber()
  @ApiProperty({
    example: '2',
  })
  readonly userId: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  readonly favorite: boolean;
}
