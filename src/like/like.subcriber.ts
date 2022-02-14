import { BadRequestException } from '@nestjs/common';
import { EntitySubscriberInterface, InsertEvent, RemoveEvent, EventSubscriber } from 'typeorm';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { DayCharacteristic } from 'src/day-characteristic/day-characteristic.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';
import { Like } from './like.entity';

@EventSubscriber()
export class LikeSubscriber implements EntitySubscriberInterface<Like> {
  listenTo() {
    return Like;
  }

  beforeInsert(event: InsertEvent<Like>) {
    const { user, topic } = event.entity;

    if (topic.user.id === user.id) {
      throw new BadRequestException();
    }
  }

  beforeRemove(event: RemoveEvent<Like>) {
    console.log(event.entity);
  }

  afterInsert(event: InsertEvent<Like>): Promise<any> | void {
    const { topic } = event.entity;

    switch (topic.type) {
      case TopicTypeDto.SUPPORT:
        break;
      case TopicTypeDto.ANSWER:
        event.manager
          .createQueryBuilder()
          .update(GoalCharacteristic)
          .set({ support: () => 'support + 1' })
          .where('goal.id = :id', { id: topic.goalId })
          .execute();
        event.manager
          .createQueryBuilder()
          .update(DayCharacteristic)
          .set({ support: () => 'support + 1' })
          .where('day.id = :id', { id: topic.dayId })
          .execute();
    }
  }
}
