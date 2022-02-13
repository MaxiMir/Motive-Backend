import { Body, Controller, Query, Get, Post, Patch, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation } from 'src/abstracts/operation';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { TopicService } from 'src/topic/topic.service';
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
    const clientID = 1; // TODO временно

    return this.topicService.save(clientID, dto);
  }

  @Get()
  @ApiPagination({ name: 'where[day]', example: 10 })
  @ApiOperation({ summary: 'Get topics' })
  @ApiResponse({ status: 200, type: [Topic] })
  find(@Query() query: FindQuery) {
    const clientID = 1; // TODO временно

    return this.topicService.find(clientID, query);
  }

  @Patch(':id/likes')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update topic likes' })
  @ApiResponse({ status: 204 })
  updateLikes(
    @Param('id', ParseIntPipe) id: number,
    @Query('operation', ParseOperationPipe) operation: Operation,
  ) {
    const clientID = 1; // TODO временно

    return this.topicService.updateLikes(clientID, id, operation);
  }
}
