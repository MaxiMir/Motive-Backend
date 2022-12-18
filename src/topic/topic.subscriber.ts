import { Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NotificationTypeDto } from 'src/common/notification-type.dto';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { TopicEntity } from './entities/topic.entity';

@Injectable()
@EventSubscriber()
export class TopicSubscriber implements EntitySubscriberInterface<TopicEntity> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return TopicEntity;
  }

  async afterInsert(event: InsertEvent<TopicEntity>) {
    const { type, goalId, day, user, text } = event.entity;
    const { data } = event.queryRunner;
    const insertData =
      type === 'answer'
        ? {
            type: NotificationTypeDto.NewAnswer,
            details: { id: goalId, day: day.id, user: day.goal.owner },
            recipient: data,
          }
        : {
            type: type === 'question' ? NotificationTypeDto.NewQuestion : NotificationTypeDto.NewSupport,
            details: { id: goalId, day: day.id, name: text, user },
            recipient: day.goal.owner,
          };

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
