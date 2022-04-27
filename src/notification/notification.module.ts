import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationSubscriber } from './notification.subscriber';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationSubscriber],
  imports: [TypeOrmModule.forFeature([Notification]), EventsModule],
})
export class NotificationModule {}
