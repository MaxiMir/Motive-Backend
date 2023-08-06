import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayPointController } from './day-point.controller';
import { DayPointService } from './day-point.service';
import { DayPointEntity } from './entities/day-point.entity';
import { DayPointSubscriber } from './day-point.subscriber';

@Module({
  controllers: [DayPointController],
  providers: [DayPointService, DayPointSubscriber],
  imports: [TypeOrmModule.forFeature([DayPointEntity])],
  exports: [DayPointService],
})
export class DayPointModule {}
