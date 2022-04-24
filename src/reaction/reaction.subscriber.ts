import { Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NOTIFICATION } from 'src/common/notification';
import { Notification } from 'src/notification/entities/notification.entity';
import { Reaction } from './entities/reaction.entity';

@Injectable()
@EventSubscriber()
export class ReactionSubscriber implements EntitySubscriberInterface<Reaction> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Reaction;
  }

  async afterInsert(event: InsertEvent<Reaction>) {
    const { characteristic, user, goal, day } = event.entity;

    const insertData = {
      type: characteristic === 'motivation' ? NOTIFICATION.ADD_MOTIVATION : NOTIFICATION.ADD_CREATIVITY,
      details: { id: goal.id, name: goal.name, day: day.id, user },
      recipient: { id: goal.ownerId },
    };

    await event.manager.createQueryBuilder().insert().into(Notification).values(insertData).execute();
  }
}
