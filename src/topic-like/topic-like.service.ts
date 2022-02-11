import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicLike } from './topic-like.entity';

@Injectable()
export class TopicLikeService {
  constructor(
    @InjectRepository(TopicLike)
    private readonly topicRepository: Repository<TopicLike>,
  ) {}

  getRepository() {
    return this.topicRepository;
  }
}
