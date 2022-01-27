import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { DayModule } from 'src/day/day.module';
import { Feedback } from './feedback.entity';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, FileService, MarkdownService],
  imports: [TypeOrmModule.forFeature([Feedback]), DayModule],
})
export class FeedbackModule {}
