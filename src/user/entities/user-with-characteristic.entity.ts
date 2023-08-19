import { ApiPropertyOptional } from '@nestjs/swagger';
import { OneToOne } from 'typeorm';
import { UserCharacteristicEntity } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserBaseEntity } from './user-base.entity';

export class UserWithCharacteristicEntity extends UserBaseEntity {
  @OneToOne(() => UserCharacteristicEntity, (characteristic) => characteristic.user, { cascade: true })
  @ApiPropertyOptional({ type: () => UserCharacteristicEntity })
  characteristic: UserCharacteristicEntity;
}
