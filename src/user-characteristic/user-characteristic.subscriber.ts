import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, Connection } from 'typeorm';
import { ExpService } from 'src/exp/exp.service';
import { UserCharacteristicEntity } from './entities/user-characteristic.entity';

@Injectable()
@EventSubscriber()
export class UserCharacteristicSubscriber implements EntitySubscriberInterface<UserCharacteristicEntity> {
  constructor(private readonly connection: Connection, private readonly expService: ExpService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserCharacteristicEntity;
  }

  async afterLoad(characteristic: UserCharacteristicEntity) {
    characteristic.level = Math.trunc(characteristic.progress);
  }

  async beforeUpdate(event: UpdateEvent<UserCharacteristicEntity>) {
    if (!event.entity?.id) return;

    const { id, points } = event.entity;
    const progress = this.expService.toProgress(points);
    const currentLevel = this.expService.toLevel(points);
    const nextLevelPoints = this.expService.toPoints(currentLevel + 1);

    await event.manager
      .createQueryBuilder()
      .update(UserCharacteristicEntity)
      .set({ progress, nextLevelPoints })
      .where('id = :id', { id })
      .execute();
  }
}
