import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { Day } from './day.entity';

@Module({
  controllers: [DayController],
  providers: [DayService],
  imports: [TypeOrmModule.forFeature([Day])],
  exports: [DayService],
})
export class DayModule {}
