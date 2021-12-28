import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [UserModule],
})
export class SubscriptionModule {}
