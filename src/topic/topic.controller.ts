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
import { Identify } from 'src/decorators/identify.decorator';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { TopicService } from 'src/topic/topic.service';
import { UserBaseDto } from 'src/user/dto/user-base.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQuery } from './dto/find-query';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Controller('topics')
@ApiTags('Topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @ApiOperation({ summary: 'Create topic' })
  @ApiResponse({ status: 200, type: Topic })
  save(@Body() dto: CreateTopicDto, @Identify() user: UserBaseDto) {
    return this.topicService.save(user.id, dto);
  }

  @Get()
  @ApiPagination({ name: 'where[day]', example: 10 })
  @ApiOperation({ summary: 'Get topics' })
  @ApiResponse({ status: 200, type: [Topic] })
  find(@Query() query: FindQuery, @Identify() user: UserBaseDto) {
    return this.topicService.find(query, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update topic' })
  @ApiResponse({ status: 204 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTopicDto, @Identify() user: UserBaseDto) {
    return this.topicService.update(user.id, id, dto);
  }

  @Patch(':id/likes')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update topic likes' })
  @ApiResponse({ status: 204 })
  updateLikes(
    @Param('id', ParseIntPipe) id: number,
    @Query('operation', ParseOperationPipe) operation: Operation,
    @Identify() user: UserBaseDto,
  ) {
    return this.topicService.updateLikes(user.id, id, operation);
  }
}
