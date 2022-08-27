import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
@EventSubscriber()
export class NotificationSubscriber implements EntitySubscriberInterface<NotificationEntity> {
  constructor(private readonly connection: Connection, private readonly eventsGateway: EventsGateway) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return NotificationEntity;
  }

  async afterInsert(event: InsertEvent<NotificationEntity>) {
    const { type, recipient, details } = event.entity;

    this.eventsGateway.handleNotification(recipient.id, { type, details });
  }
}
