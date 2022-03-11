import { ApiPropertyOptional } from '@nestjs/swagger';
import { OneToOne } from 'typeorm';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserDto } from './user.dto';

export class UserWithCharacteristicDto extends UserDto {
  @OneToOne(() => UserCharacteristic, (characteristic) => characteristic.user, { cascade: true })
  @ApiPropertyOptional({ type: () => UserCharacteristic })
  characteristic: UserCharacteristic;
}
