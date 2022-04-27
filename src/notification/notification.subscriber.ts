import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { Notification } from 'src/notification/entities/notification.entity';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
@EventSubscriber()
export class NotificationSubscriber implements EntitySubscriberInterface<Notification> {
  constructor(private readonly connection: Connection, private readonly eventsGateway: EventsGateway) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Notification;
  }

  async afterInsert(event: InsertEvent<Notification>) {
    const { type, recipient, details } = event.entity;

    this.eventsGateway.handleNotification(recipient.id, { type, details });
  }
}
