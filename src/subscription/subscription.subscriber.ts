import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { NOTIFICATION } from 'src/common/notification';
import { Notification } from 'src/notification/entities/notification.entity';
import { Subscription } from './entities/subscription.entity';

@Injectable()
@EventSubscriber()
export class SubscriptionSubscriber implements EntitySubscriberInterface<Subscription> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Subscription;
  }

  async afterInsert(event: InsertEvent<Subscription>) {
    const { user, follower } = event.entity;
    const insertData = {
      type: NOTIFICATION.NEW_FOLLOWER,
      details: { user: follower },
      recipient: user,
    };

    await event.manager.createQueryBuilder().insert().into(Notification).values(insertData).execute();
  }
}
