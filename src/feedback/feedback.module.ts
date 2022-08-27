import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { DayModule } from 'src/day/day.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { FeedbackEntity } from './entities/feedback.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { FeedbackSubscriber } from './feedback.subscriber';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, FileService, FeedbackSubscriber],
  imports: [TypeOrmModule.forFeature([FeedbackEntity]), DayModule, SubscriptionModule],
})
export class FeedbackModule {}
