import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCharacteristicController } from './user-characteristic.controller';
import { UserCharacteristicService } from './user-characteristic.service';
import { UserCharacteristic } from './user-characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCharacteristic])],
  providers: [UserCharacteristicService],
  controllers: [UserCharacteristicController],
})
export class UserCharacteristicModule {}
