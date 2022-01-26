import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.entity';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [TypeOrmModule.forFeature([Subscription]), UserModule],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
