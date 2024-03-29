import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { NotificationTypeDto } from 'src/notification/dto/notification.type.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { GoalEntity } from './entities/goal.entity';

@Injectable()
@EventSubscriber()
export class GoalSubscriber implements EntitySubscriberInterface<GoalEntity> {
  constructor(
    private readonly connection: Connection,
    private readonly subscriptionService: SubscriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return GoalEntity;
  }

  async afterInsert(event: InsertEvent<GoalEntity>) {
    const { id, name, days, owner } = event.entity;
    const followers = await this.subscriptionService.findFollowers(owner.id);
    const insertData = followers.map((recipient) => ({
      type: NotificationTypeDto.NewGoal,
      details: { id, day: days[0].id, name },
      initiator: owner,
      recipient,
    }));

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
