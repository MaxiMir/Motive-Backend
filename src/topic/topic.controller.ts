import { Body, Controller, Query, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopicService } from 'src/topic/topic.service';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQuery } from './dto/find-query';
import { Topic } from './topic.entity';

@Controller('topics')
@ApiTags('Topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @ApiOperation({ summary: 'Create topic' })
  @ApiResponse({ status: 200, type: Topic })
  save(@Body() dto: CreateTopicDto) {
    const clientId = 1; // TODO временно

    return this.topicService.save(clientId, dto);
  }

  @Get()
  @ApiPagination({ name: 'where[day]', example: 10 })
  @ApiOperation({ summary: 'Get topics' })
  @ApiResponse({ status: 200, type: [Topic] })
  find(@Query() query: FindQuery) {
    const clientId = 1; // TODO временно

    return this.topicService.find(clientId, query);
  }
}
