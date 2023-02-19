import { Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NotificationTypeDto } from 'src/common/notification-type.dto';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { ReactionEntity } from './entities/reaction.entity';

@Injectable()
@EventSubscriber()
export class ReactionSubscriber implements EntitySubscriberInterface<ReactionEntity> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ReactionEntity;
  }

  async afterInsert(event: InsertEvent<ReactionEntity>) {
    const { characteristic, user, goal, day } = event.entity;

    const insertData = {
      type:
        characteristic === 'motivation'
          ? NotificationTypeDto.AddMotivation
          : NotificationTypeDto.AddCreativity,
      details: { id: goal.id, name: goal.name, day: day.id },
      initiator: user,
      recipient: { id: goal.ownerId },
    };

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
