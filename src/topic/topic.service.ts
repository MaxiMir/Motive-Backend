import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { Answer } from 'src/answer/answer.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQuery } from './dto/find-query';
import { Topic } from './topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly markdownService: MarkdownService,
  ) {}

  async create(userId: number, dto: CreateTopicDto) {
    const user = await this.userService.findByPK(userId);
    const topic = !dto.answer
      ? new Topic()
      : await this.findByPK(dto.answer, { relations: ['day', 'day.goal'] });

    return this.topicRepository.manager.transaction(async (transactionalManager) => {
      if (!dto.answer) {
        const day = await this.dayService.findByPK(dto.dayId);
        topic.text = this.markdownService.convert(dto.text);
        topic.type = dto.type;
        topic.user = user;
        topic.day = day;
      } else {
        const goal = await this.goalService.findByPK(topic.day.goal.id, { relations: ['characteristic'] });
        const answer = new Answer();
        answer.text = this.markdownService.convert(dto.text);
        answer.user = user;
        topic.answers.push(answer);
        topic.day.characteristic.support += 1;
        goal.characteristic.support += 1;
        await transactionalManager.save(goal);
      }

      topic.day.topicCount += 1;

      return transactionalManager.save(topic);
    });
  }

  async find(query: FindQuery) {
    return this.topicRepository.find({
      order: {
        id: 'DESC',
      },
      ...query,
    });
  }

  async findByPK(id: number, options?: FindOneOptions<Topic>) {
    return await this.topicRepository.findOneOrFail({ id }, options);
  }
}
