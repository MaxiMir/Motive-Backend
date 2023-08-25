import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async afterInsert(event: InsertEvent<UserEntity>) {
    const { id } = event.entity;
    const nickname = `id${id}`;

    await event.manager
      .createQueryBuilder()
      .update(UserEntity)
      .set({ nickname })
      .where('id = :id', { id })
      .execute();
  }
}
