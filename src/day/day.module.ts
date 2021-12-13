import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { Day } from './day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  providers: [DayService],
  controllers: [DayController],
})
export class DayModule {}
