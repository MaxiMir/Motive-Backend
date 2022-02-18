import { EntitySubscriberInterface, InsertEvent, EventSubscriber } from 'typeorm';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';
import { Like } from './entities/like.entity';
import { ExperienceService } from '../experience/experience.service';

@EventSubscriber()
export class LikeSubscriber implements EntitySubscriberInterface<Like> {
  listenTo() {
    return Like;
  }

  afterInsert(event: InsertEvent<Like>): Promise<any> | void {
    const { topic } = event.entity;

    switch (topic.type) {
      case TopicTypeDto.SUPPORT:
        event.manager
          .createQueryBuilder(UserCharacteristic, 'characteristic')
          .select(['characteristic.support_points as support_points'])
          .where('characteristic.user.id = :id', { id: topic.user.id })
          .getRawOne()
          .then(({ support_points }) =>
            event.manager
              .createQueryBuilder()
              .update(UserCharacteristic)
              .set({
                support_points: () => 'support_points + 1',
                support: ExperienceService.getProgress(support_points + 1),
              })
              .where('user.id = :id', { id: topic.userId })
              .execute(),
          );
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
