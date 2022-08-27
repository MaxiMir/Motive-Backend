import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationDto } from 'src/common/operation.dto';
import { TopicEntity } from 'src/topic/entities/topic.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly topicRepository: Repository<LikeEntity>,
  ) {}

  async findLikedTopics(userId: number, topicIds: number[]) {
    const likes = await this.topicRepository
      .createQueryBuilder('like')
      .select(['like.topic.id as topic_id'])
      .where('like.topic.id IN (:...topicIds)', { topicIds })
      .andWhere('like.user.id = :userId', { userId })
      .getRawMany();

    return likes.map((l) => l.topic_id);
  }

  getUniq(userId: number, topicId: number) {
    return [userId, topicId].join(':');
  }

  checkCanLike(userId: number, topic: TopicEntity, operation: OperationDto) {
    const isLikeSelf = topic.user.id === userId;
    const isDeleteSupport = topic.type === TopicTypeDto.Support && operation === 'delete';

    return !(isLikeSelf || isDeleteSupport);
  }
}
