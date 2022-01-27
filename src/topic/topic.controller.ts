import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopicService } from 'src/topic/topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './topic.entity';

@Controller('topics')
@ApiTags('Topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @ApiOperation({ summary: 'Create topic' })
  @ApiResponse({ status: 200, type: Topic })
  createTopic(@Body() dto: CreateTopicDto) {
    const clientId = 1; // TODO временно

    return this.topicService.create(clientId, dto);
  }
}
