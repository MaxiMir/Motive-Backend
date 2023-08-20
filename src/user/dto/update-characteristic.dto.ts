import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SphereTypeDto } from 'src/common/sphere-type.dto';

export class UpdateCharacteristicDto {
  @IsEnum(SphereTypeDto)
  readonly sphere: string;

  @IsInt()
  @Min(0)
  @Max(10)
  @ApiProperty({
    example: 2,
  })
  readonly value: number;
}
