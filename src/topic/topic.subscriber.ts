import { Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NotificationDto } from 'src/common/notification.dto';
import { Notification } from 'src/notification/entities/notification.entity';
import { Topic } from './entities/topic.entity';

@Injectable()
@EventSubscriber()
export class TopicSubscriber implements EntitySubscriberInterface<Topic> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Topic;
  }

  async afterInsert(event: InsertEvent<Topic>) {
    const { type, goalId, day, user, text } = event.entity;

    const insertData =
      type === 'answer'
        ? {
            type: NotificationDto.NewAnswer,
            details: { id: goalId, day: day.id, user: day.goal.owner },
            recipient: user,
          }
        : {
            type: type === 'question' ? NotificationDto.NewQuestion : NotificationDto.NewSupport,
            details: { id: goalId, day: day.id, name: text, user },
            recipient: day.goal.owner,
          };

    await event.manager.createQueryBuilder().insert().into(Notification).values(insertData).execute();
  }
}
