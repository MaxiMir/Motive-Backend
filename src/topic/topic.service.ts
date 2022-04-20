import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/common/operation';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { LikeService } from 'src/like/like.service';
import { ExpService } from 'src/exp/exp.service';
import { Like } from 'src/like/entities/like.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQueryDto } from './dto/find-query.dto';
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
    private readonly expService: ExpService,
  ) {}

  async save(dto: CreateTopicDto, userId: number) {
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

  async update(id: number, dto: UpdateTopicDto, userId: number) {
    const user = await this.userService.findByPK(userId);

    return this.topicRepository.update({ id, user }, { text: dto.text, edited: true });
  }

  async find(query: FindQueryDto, userId?: number) {
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

  async updateLikes(id: number, operation: Operation, userId: number) {
    const user = { id: userId };
    const topic = await this.findByPK(id, { relations: ['user', 'user.characteristic'] });
    const uniq = this.likeService.getUniq(userId, topic.id);
    const validateLike = this.likeService.checkCanLike(userId, topic, operation);
    topic.likeCount += operation === 'insert' ? 1 : -1;

    if (!validateLike) {
      throw new BadRequestException();
    }

    return this.topicRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](Like, { user, topic, uniq });

      switch (topic.type) {
        case TopicTypeDto.ANSWER:
          await transactionalManager.increment(DayCharacteristic, { day: topic.dayId }, 'support', 1);
          await transactionalManager.increment(GoalCharacteristic, { goal: topic.goalId }, 'support', 1);
          break;
        case TopicTypeDto.SUPPORT:
          topic.user.characteristic.support_all += 1;
          topic.user.characteristic.support = this.expService.getProgress(
            topic.user.characteristic.support_all,
          );
          break;
      }

      await transactionalManager.save(topic);
    });
  }
}
