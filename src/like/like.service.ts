import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from 'src/abstracts/operation';
import { User } from 'src/user/entities/user.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly topicRepository: Repository<Like>,
  ) {}

  getRepository() {
    return this.topicRepository;
  }

  getUniq(userId: number, topicId: number) {
    return [userId, topicId].join(':');
  }

  checkOnValid(user: User, topic: Topic, operation: Operation) {
    const isLikeSelf = topic.user.id === user.id;
    const isDeleteSupport = topic.type === TopicTypeDto.SUPPORT && operation === 'delete';

    return !(isLikeSelf || isDeleteSupport);
  }
}
