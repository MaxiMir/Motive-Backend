import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayService } from 'src/day/day.service';
import { UserService } from 'src/user/user.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './topic.entity';
import { FindQuery } from './dto/find-query';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Answer } from '../answer/answer.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
    private readonly markdownService: MarkdownService,
  ) {}

  async create(userId: number, dto: CreateTopicDto) {
    const user = await this.userService.findByPK(userId);
    const topic = !dto.answer ? new Topic() : await this.findByPK(dto.answer, { relations: ['day'] });

    if (!dto.answer) {
      const day = await this.dayService.findByPK(dto.dayId);
      topic.text = this.markdownService.convert(dto.text);
      topic.type = dto.type;
      topic.user = user;
      topic.day = day;
    } else {
      const answer = new Answer();
      answer.text = this.markdownService.convert(dto.text);
      answer.user = user;
      topic.answers.push(answer);
    }

    topic.day.topicCount += 1;

    return this.topicRepository.save(topic);
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
