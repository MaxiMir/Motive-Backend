import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicDto } from 'src/user/dto/user-with-characteristic.dto';

export class RatingContentDto {
  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  motivation: UserWithCharacteristicDto[];

  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  creativity: UserWithCharacteristicDto[];

  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  support: UserWithCharacteristicDto[];
}
