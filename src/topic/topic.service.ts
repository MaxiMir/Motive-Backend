import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { OperationDto } from 'src/common/operation.dto';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';
import { TopicLikeService } from 'src/topic-like/topic-like.service';
import { TopicLikeEntity } from 'src/topic-like/entities/topic-like.entity';
import { DayEntity } from 'src/day/entities/day.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { TopicTypeDto } from './dto/topic-type.dto';
import { TopicEntity } from './entities/topic.entity';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
    private readonly topicLikeService: TopicLikeService,
  ) {}

  async create(dto: CreateTopicDto, userId: number) {
    const user = await this.userService.findByPK(userId);
    const day = await this.dayService.findByPK(dto.dayId, { relations: ['goal', 'goal.owner'] });
    const topic = new TopicEntity();
    topic.text = dto.text;
    topic.type = dto.type;
    topic.user = user;
    topic.day = day;
    topic.day.topicCount += 1;
    topic.goalId = day.goalId;

    if (!dto.topicId) {
      return this.topicRepository.save(topic);
    }

    const question = await this.findByPK(dto.topicId);
    topic.parentId = dto.topicId;
    question.answer = topic;

    return this.topicRepository.save(question, { data: question.user });
  }

  async update(id: number, dto: UpdateTopicDto, userId: number) {
    const user = await this.userService.findByPK(userId);

    return this.topicRepository.update({ id, user }, { text: dto.text, edited: true });
  }

  async find(query: FindQueryDto, userId?: number) {
    const { where, take, skip } = query;
    const topics = await this.topicRepository.find({
      where: { type: Not(TopicTypeDto.Answer), ...where },
      relations: ['answer'],
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });

    if (!userId || !topics.length) {
      return topics;
    }

    const ids = topics.reduce((acc, { id, answer }) => [...acc, id, ...(!answer ? [] : [answer.id])], []);
    const likedTopic = await this.topicLikeService.findLikedTopics(ids, userId);

    return topics.map((topic) => ({
      ...topic,
      like: likedTopic.includes(topic.id),
      answer: topic.answer && { ...topic.answer, like: likedTopic.includes(topic.answer.id) },
    }));
  }

  async findByPK(id: number, options?: FindOneOptions<TopicEntity>) {
    return await this.topicRepository.findOneOrFail({ id }, options);
  }

  async updateLikes(id: number, operation: OperationDto, userId: number) {
    const user = { id: userId };
    const topic = await this.findByPK(id, { relations: ['user', 'user.characteristic'] });
    const uniq = [userId, topic.id].join(':');
    const validateLike = topic.user.id !== userId;
    const incrementBy = operation === 'insert' ? 1 : -1;
    topic.likeCount += incrementBy;

    if (!validateLike) {
      throw new BadRequestException();
    }

    return this.topicRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](TopicLikeEntity, { user, topic, uniq });

      switch (topic.type) {
        case TopicTypeDto.Answer:
          await transactionalManager.increment(DayEntity, { id: topic.dayId }, 'points', incrementBy);
          await transactionalManager.increment(GoalEntity, { id: topic.goalId }, 'points', incrementBy);
          break;
        case TopicTypeDto.Support:
          topic.user.characteristic.points += 1;
          break;
      }

      await transactionalManager.save(topic);
    });
  }
}
