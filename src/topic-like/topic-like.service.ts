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

  async findLikedTopics(ids: number[], userId: number) {
    const likes = await this.topicRepository
      .createQueryBuilder('like')
      .select(['like.topic.id as id'])
      .where('like.topic.id in (:...ids)', { ids })
      .andWhere('like.user.id = :userId', { userId })
      .getRawMany();

    return likes.map((l) => l.id);
  }
}
