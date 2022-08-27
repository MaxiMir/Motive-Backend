import { Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NotificationDto } from 'src/common/notification.dto';
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
      type: characteristic === 'motivation' ? NotificationDto.AddMotivation : NotificationDto.AddCreativity,
      details: { id: goal.id, name: goal.name, day: day.id, user },
      recipient: { id: goal.ownerId },
    };

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
