import { ApiPropertyOptional } from '@nestjs/swagger';
import { OneToOne } from 'typeorm';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserBaseDto } from './user-base.dto';

export class UserWithCharacteristicDto extends UserBaseDto {
  @OneToOne(() => UserCharacteristic, (characteristic) => characteristic.user, { cascade: true })
  @ApiPropertyOptional({ type: () => UserCharacteristic })
  characteristic: UserCharacteristic;
}
