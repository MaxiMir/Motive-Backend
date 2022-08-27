import { ApiPropertyOptional } from '@nestjs/swagger';
import { OneToOne } from 'typeorm';
import { UserCharacteristicEntity } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserExtendedEntity } from './userExtendedEntity';

export class UserWithCharacteristicEntity extends UserExtendedEntity {
  @OneToOne(() => UserCharacteristicEntity, (characteristic) => characteristic.user, { cascade: true })
  @ApiPropertyOptional({ type: () => UserCharacteristicEntity })
  characteristic: UserCharacteristicEntity;
}
