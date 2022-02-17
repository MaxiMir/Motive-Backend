import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayController } from './day.controller';
import { DayService } from './day.service';
import { Day } from './entities/day.entity';

@Module({
  controllers: [DayController],
  providers: [DayService],
  imports: [TypeOrmModule.forFeature([Day])],
  exports: [DayService],
})
export class DayModule {}
