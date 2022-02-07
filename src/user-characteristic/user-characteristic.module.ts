import { Module } from '@nestjs/common';
import { UserCharacteristicController } from './user-characteristic.controller';
import { UserCharacteristicService } from './user-characteristic.service';

@Module({
  controllers: [UserCharacteristicController],
  providers: [UserCharacteristicService],
})
export class UserCharacteristicModule {}
