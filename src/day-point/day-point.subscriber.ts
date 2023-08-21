import { Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NotificationTypeDto } from 'src/notification/dto/notification.type.dto';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { DayPointEntity } from './entities/day-point.entity';

@Injectable()
@EventSubscriber()
export class DayPointSubscriber implements EntitySubscriberInterface<DayPointEntity> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DayPointEntity;
  }

  async afterInsert(event: InsertEvent<DayPointEntity>) {
    const { user, goal, day } = event.entity;
    const insertData = {
      type: NotificationTypeDto.AddedPoints,
      details: { id: goal.id, name: goal.name, day: day.id },
      initiator: user,
      recipient: { id: goal.ownerId },
    };

    await event.manager.createQueryBuilder().insert().into(NotificationEntity).values(insertData).execute();
  }
}
