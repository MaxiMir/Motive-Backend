import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { NotificationTypeDto } from 'src/notification/dto/notification.type.dto';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { SubscriptionEntity } from './entities/subscription.entity';

@Injectable()
@EventSubscriber()
export class SubscriptionSubscriber implements EntitySubscriberInterface<SubscriptionEntity> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return SubscriptionEntity;
  }

  async afterInsert(event: InsertEvent<SubscriptionEntity>) {
    const { user, follower } = event.entity;
    const insertData = {
      type: NotificationTypeDto.NewFollower,
      details: {},
      initiator: follower,
      recipient: user,
    };

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
