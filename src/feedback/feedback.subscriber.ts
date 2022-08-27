import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { NotificationDto } from 'src/common/notification.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { FeedbackEntity } from './entities/feedback.entity';

@Injectable()
@EventSubscriber()
export class FeedbackSubscriber implements EntitySubscriberInterface<FeedbackEntity> {
  constructor(
    private readonly connection: Connection,
    private readonly subscriptionService: SubscriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return FeedbackEntity;
  }

  async afterInsert(event: InsertEvent<FeedbackEntity>) {
    const { day } = event.entity;
    const { id, owner } = day.goal;
    const followers = await this.subscriptionService.findFollowers(owner.id);
    const insertData = followers.map((recipient) => ({
      type: NotificationDto.NewFeedback,
      details: { id, day: day.id, user: owner },
      recipient,
    }));

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
