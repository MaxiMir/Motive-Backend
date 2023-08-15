import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicLikeEntity } from './entities/topic-like.entity';

@Injectable()
export class TopicLikeService {
  constructor(
    @InjectRepository(TopicLikeEntity)
    private readonly topicRepository: Repository<TopicLikeEntity>,
  ) {}

  async findLikedTopics(userId: number, topicIds: number[]) {
    const likes = await this.topicRepository
      .createQueryBuilder('like')
      .select(['like.topic.id as topic_id'])
      .where('like.topic.id in (:...topicIds)', { topicIds })
      .andWhere('like.user.id = :userId', { userId })
      .getRawMany();

    return likes.map((l) => l.topic_id);
  }
}
