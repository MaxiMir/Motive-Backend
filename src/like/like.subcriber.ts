import { EntitySubscriberInterface, InsertEvent, EventSubscriber } from 'typeorm';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';
import { Like } from './entities/like.entity';

@EventSubscriber()
export class LikeSubscriber implements EntitySubscriberInterface<Like> {
  listenTo() {
    return Like;
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
