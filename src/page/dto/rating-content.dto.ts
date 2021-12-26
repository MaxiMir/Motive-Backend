import { UserWithCharacteristicDto } from '../../user/dto/user-with-characteristic.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RatingContentDto {
  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  motivation: UserWithCharacteristicDto[];

  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  creativity: UserWithCharacteristicDto[];

  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  support: UserWithCharacteristicDto[];
}
