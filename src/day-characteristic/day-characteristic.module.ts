import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayCharacteristic } from './entities/day-characteristic.entity';
import { DayCharacteristicController } from './day-characteristic.controller';
import { DayCharacteristicService } from './day-characteristic.service';

@Module({
  controllers: [DayCharacteristicController],
  providers: [DayCharacteristicService],
  imports: [TypeOrmModule.forFeature([DayCharacteristic])],
})
export class DayCharacteristicModule {}
