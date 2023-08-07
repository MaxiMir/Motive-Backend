import { Module } from '@nestjs/common';
import { ExpModule } from 'src/exp/exp.module';
import { UserCharacteristicController } from './user-characteristic.controller';
import { UserCharacteristicService } from './user-characteristic.service';
import { UserCharacteristicSubscriber } from './user-characteristic.subscriber';

@Module({
  controllers: [UserCharacteristicController],
  providers: [UserCharacteristicService, UserCharacteristicSubscriber],
  imports: [ExpModule],
})
export class UserCharacteristicModule {}
