import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayCharacteristicController } from './day-characteristic.controller';
import { DayCharacteristicService } from './day-characteristic.service';
import { DayCharacteristic } from './day-characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DayCharacteristic])],
  providers: [DayCharacteristicService],
  controllers: [DayCharacteristicController],
})
export class DayCharacteristicModule {}
