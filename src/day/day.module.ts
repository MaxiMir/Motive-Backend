import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { Day } from './day.entity';

@Module({
  controllers: [DayController],
  providers: [DayService, FileService],
  imports: [TypeOrmModule.forFeature([Day])],
  exports: [DayService],
})
export class DayModule {}
