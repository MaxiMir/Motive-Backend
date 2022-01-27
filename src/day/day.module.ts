import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { DayController } from './day.controller';
import { DayService } from './day.service';
import { Day } from './day.entity';

@Module({
  controllers: [DayController],
  providers: [DayService, FileService, MarkdownService],
  imports: [TypeOrmModule.forFeature([Day])],
  exports: [DayService],
})
export class DayModule {}
