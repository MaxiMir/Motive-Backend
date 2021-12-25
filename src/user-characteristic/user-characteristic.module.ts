import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCharacteristicController } from './user-characteristic.controller';
import { UserCharacteristicService } from './user-characteristic.service';
import { UserCharacteristic } from './user-characteristic.entity';

@Module({
  controllers: [UserCharacteristicController],
  providers: [UserCharacteristicService],
  imports: [TypeOrmModule.forFeature([UserCharacteristic])],
})
export class UserCharacteristicModule {}
