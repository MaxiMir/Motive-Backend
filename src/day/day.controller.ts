import { Controller, Param, ParseIntPipe, Get, Patch, Query, Post, HttpCode, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/abstracts/pagination';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Topic } from 'src/topic/topic.entity';
import { Goal } from 'src/goal/goal.entity';
import { DayService } from './day.service';
import { Day } from './day.entity';
import { CreateDayDto } from './dto/create-day.dto';

@Controller('days')
@ApiTags('Days')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post('')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add day' })
  @ApiResponse({ status: 200, type: Goal })
  create(@Body() dto: CreateDayDto) {
    return this.dayService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get day' })
  @ApiResponse({ status: 200, type: Day })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findByPK(id);
  }

  @Patch(':id/views')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'Increase day views' })
  increaseViews(@Param('id', ParseIntPipe) id: number) {
    // todo only auth
    return this.dayService.increaseViews(id);
  }

  @Get(':id/topics')
  @ApiPagination()
  @ApiOperation({ summary: 'Get topics' })
  @ApiResponse({ status: 200, type: [Topic] })
  getTopics(@Param('id', ParseIntPipe) id: number, @Query() query: Pagination) {
    return this.dayService.findTopics(id, query);
  }
}
