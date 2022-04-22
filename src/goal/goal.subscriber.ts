import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { TOPICS } from 'src/common/notification';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { Goal } from './entities/goal.entity';

@Injectable()
@EventSubscriber()
export class GoalSubscriber implements EntitySubscriberInterface<Goal> {
  constructor(
    private readonly connection: Connection,
    private readonly subscriptionService: SubscriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Goal;
  }

  async afterInsert(event: InsertEvent<Goal>) {
    const { id, name, days, owner } = event.entity;
    const followers = await this.subscriptionService.findFollowers(owner.id);
    const insertData = followers.map((recipient) => ({
      type: TOPICS.NEW_GOAL,
      details: { id, day: days[0].id, name, user: owner },
      recipient,
    }));

    await event.manager.createQueryBuilder().insert().into(Notification).values(insertData).execute();
  }
}
