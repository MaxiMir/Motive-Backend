import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { LikeService } from 'src/like/like.service';
import { Like } from 'src/like/entities/like.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQuery } from './dto/find-query';
import { TopicTypeDto } from './dto/topic-type.dto';
import { Topic } from './entities/topic.entity';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly likeService: LikeService,
  ) {}

  async save(userId: number, dto: CreateTopicDto) {
    const user = await this.userService.findByPK(userId);
    const day = await this.dayService.findByPK(dto.dayId);
    const topic = new Topic();
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

    return this.topicRepository.save(question);
  }

  async update(userId: number, id: number, dto: UpdateTopicDto) {
    const user = await this.userService.findByPK(userId);

    return this.topicRepository.update({ id, user }, { text: dto.text, edited: true });
  }

  async find(query: FindQuery, userId?: number) {
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

    if (!userId || !topics.length) {
      return topics;
    }

    const ids = topics.reduce((acc, { id, answer }) => [...acc, id, ...(!answer ? [] : [answer.id])], []);
    const likedTopic = await this.likeService.findLikedTopics(userId, ids);

    return topics.map((topic) => ({
      ...topic,
      like: likedTopic.includes(topic.id),
      answer: topic.answer && { ...topic.answer, like: likedTopic.includes(topic.answer.id) },
    }));
  }

  async findByPK(id: number, options?: FindOneOptions<Topic>) {
    return await this.topicRepository.findOneOrFail({ id }, options);
  }

  async updateLikes(userId: number, id: number, operation: Operation) {
    const topic = await this.findByPK(id);
    const user = await this.userService.findByPK(userId);
    const uniq = this.likeService.getUniq(user.id, topic.id); // for check duplicate
    const validateLike = this.likeService.checkOnValid(user, topic, operation);
    topic.likeCount += operation === 'insert' ? 1 : -1;

    if (!validateLike) {
      throw new BadRequestException();
    }

    return this.topicRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](Like, { user, topic, uniq });
      await transactionalManager.save(topic);
    });
  }
}
