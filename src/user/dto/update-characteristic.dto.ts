import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SphereDto } from 'src/user-characteristic/dto/sphere.dto';

export class UpdateCharacteristicDto {
  @IsEnum(SphereDto)
  readonly name: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({
    example: 2,
  })
  readonly value: number;
}
