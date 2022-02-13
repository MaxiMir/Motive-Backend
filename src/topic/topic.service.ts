import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { TopicLikeService } from 'src/topic-like/topic-like.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQuery } from './dto/find-query';
import { TopicTypeDto } from './dto/topic-type.dto';
import { Topic } from './topic.entity';
import { TopicLike } from '../topic-like/topic-like.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly topicLikeService: TopicLikeService,
    private readonly markdownService: MarkdownService,
  ) {}

  async save(userID: number, dto: CreateTopicDto) {
    const user = await this.userService.findByPK(userID);
    const day = await this.dayService.findByPK(dto.dayID);
    const topic = new Topic();

    topic.text = this.markdownService.convert(dto.text);
    topic.type = dto.type;
    topic.user = user;
    topic.day = day;
    topic.day.topicCount += 1;

    if (!dto.topicID) {
      return this.topicRepository.save(topic);
    }

    const question = await this.findByPK(dto.topicID);
    question.answer = topic;

    return this.topicRepository.save(question);
  }

  async find(userID: number, query: FindQuery) {
    const { where, take, skip } = query;
    const topics = await this.topicRepository.find({
      where: { type: Not(TopicTypeDto.ANSWER), ...where },
      relations: ['answer'],
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });

    if (!userID) {
      return topics;
    }

    const ids = topics.reduce((acc, { id, answer }) => [...acc, id, ...(!answer ? [] : [answer.id])], []);
    const likes = await this.topicLikeService
      .getRepository()
      .createQueryBuilder('topic-like')
      .leftJoin('topic-like.topic', 'topic')
      .leftJoin('topic-like.user', 'user')
      .select(['topic.id'])
      .where('user.id = :userID', { userID })
      .andWhere('topic.id IN (:...ids)', { ids })
      .getRawMany();
    const likedTopic = likes.map((l) => l.topic_id);

    return topics.map((topic) => ({
      ...topic,
      like: likedTopic.includes(topic.id),
      answer: topic.answer && { ...topic.answer, like: likedTopic.includes(topic.answer.id) },
    }));
  }

  async findByPK(id: number, options?: FindOneOptions<Topic>) {
    return await this.topicRepository.findOneOrFail({ id }, options);
  }

  async updateLikes(userID: number, id: number, operation: Operation) {
    const user = await this.userService.findByPK(userID);
    const topic = await this.findByPK(id, { relations: ['user'] });

    if (topic.user.id === userID) {
      throw new BadRequestException("Error: you can't like yourself");
    }

    topic.likeCount += operation === 'insert' ? 1 : -1;

    return this.topicRepository.manager.transaction(async (transactionalManager) => {
      // todo check on exists
      await transactionalManager[operation](TopicLike, { user, topic });
      await transactionalManager.save(topic);
    });
  }
}
