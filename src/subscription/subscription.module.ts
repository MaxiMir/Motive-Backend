import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { GoalSubscriber } from 'src/goal/goal.subscriber';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, GoalSubscriber],
  imports: [TypeOrmModule.forFeature([Subscription]), UserModule],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
