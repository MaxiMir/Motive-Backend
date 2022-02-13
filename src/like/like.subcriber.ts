import { BadRequestException } from '@nestjs/common';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';
import { Like } from './like.entity';

@EventSubscriber()
export class LikeSubscriber implements EntitySubscriberInterface<Like> {
  listenTo() {
    return Like;
  }

  async beforeInsert(event: InsertEvent<Like>) {
    const { user, topic } = event.entity;
    const result = await event.manager
      .getRepository(Like)
      .createQueryBuilder('like')
      .select(['like.topic.id'])
      .where('like.topic.id = :id', { id: topic.id })
      .andWhere('like.user.id = :userId', { userId: user.id })
      .getRawOne();

    if (result || topic.user.id === user.id) {
      throw new BadRequestException();
    }
  }

  afterInsert(event: InsertEvent<Like>): Promise<any> | void {
    const { topic } = event.entity;

    if (topic.type === TopicTypeDto.ANSWER) {
      // event.manager
      //   .createQueryBuilder()
      //   .update(GoalCharacteristic)
      //   .set({ support: () => 'support + 1' })
      //   .where('goal.id = :id', { id: entity.day.goal.id })
      //   .execute();
    }
  }
}
