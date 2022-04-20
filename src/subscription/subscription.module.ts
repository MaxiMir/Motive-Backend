import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscriptionSubscriber } from './subscription.subscriber';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionSubscriber],
  imports: [TypeOrmModule.forFeature([Subscription]), UserModule],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
