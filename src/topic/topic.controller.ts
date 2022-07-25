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
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OperationDto } from 'src/common/operation.dto';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { TopicService } from 'src/topic/topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Controller('topics')
@ApiTags('Topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @ApiOperation({ summary: 'Create topic' })
  @ApiResponse({ status: 200, type: Topic })
  save(@Body() dto: CreateTopicDto, @Identify() clientId: number) {
    return this.topicService.save(dto, clientId);
  }

  @Get()
  @ApiPagination({ name: 'where[day]', example: 10 })
  @ApiOperation({ summary: 'Get topics' })
  @ApiResponse({ status: 200, type: [Topic] })
  find(@Query() query: FindQueryDto, @Identify() clientId?: number) {
    return this.topicService.find(query, clientId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update topic' })
  @ApiResponse({ status: 204 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTopicDto, @Identify() clientId: number) {
    return this.topicService.update(id, dto, clientId);
  }

  @Patch(':id/likes')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'Update topic likes' })
  @ApiResponse({ status: 204 })
  updateLikes(
    @Param('id', ParseIntPipe) id: number,
    @Query('operation', ParseOperationPipe) operation: OperationDto,
    @Identify() clientId: number,
  ) {
    return this.topicService.updateLikes(id, operation, clientId);
  }
}
