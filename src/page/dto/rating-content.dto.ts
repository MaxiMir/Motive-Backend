import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicEntity } from 'src/user/entities/user-with-characteristic.entity';

export class RatingContentDto {
  @ApiProperty({ type: () => UserWithCharacteristicEntity, isArray: true })
  readonly motivation: UserWithCharacteristicEntity[];

  @ApiProperty({ type: () => UserWithCharacteristicEntity, isArray: true })
  readonly creativity: UserWithCharacteristicEntity[];

  @ApiProperty({ type: () => UserWithCharacteristicEntity, isArray: true })
  readonly support: UserWithCharacteristicEntity[];
}
