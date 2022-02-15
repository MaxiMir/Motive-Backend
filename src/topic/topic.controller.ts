import {
  Body,
  Controller,
  Query,
  Get,
  Post,
  Patch,
  HttpCode,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation } from 'src/abstracts/operation';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { TopicService } from 'src/topic/topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQuery } from './dto/find-query';
import { Topic } from './entities/topic.entity';
import { UpdateTopicDto } from './dto/update-topic.dto';

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

  @Put(':id')
  @ApiOperation({ summary: 'Update topic' })
  @ApiResponse({ status: 200, type: [Topic] })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTopicDto) {
    const clientId = 1; // TODO временно

    return this.topicService.update(clientId, id, dto);
  }

  @Patch(':id/likes')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update topic likes' })
  @ApiResponse({ status: 204 })
  updateLikes(
    @Param('id', ParseIntPipe) id: number,
    @Query('operation', ParseOperationPipe) operation: Operation,
  ) {
    const clientId = 1; // TODO временно

    return this.topicService.updateLikes(clientId, id, operation);
  }
}
