import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayEntity } from './entities/day.entity';
import { DayController } from './day.controller';
import { DayService } from './day.service';

@Module({
  controllers: [DayController],
  providers: [DayService],
  imports: [TypeOrmModule.forFeature([DayEntity])],
  exports: [DayService],
})
export class DayModule {}
