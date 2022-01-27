import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayService } from 'src/day/day.service';
import { UserService } from 'src/user/user.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './topic.entity';
import { FindQuery } from './dto/find-query';

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
    const day = await this.dayService.findByPK(dto.dayId);
    const user = await this.userService.findByPK(userId);
    const topic = new Topic();

    topic.message = this.markdownService.convert(dto.message);
    topic.type = dto.type;
    topic.user = user;
    topic.day = day;
    topic.day.topicCount += 1;

    return this.topicRepository.save(topic);
  }

  async find(query: FindQuery) {
    return this.topicRepository.find({
      relations: ['user'],
      order: {
        id: 'DESC',
      },
      ...query,
    });
  }
}
