import { Controller, Param, ParseIntPipe, Get, Patch, Post, HttpCode, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Goal } from 'src/goal/entities/goal.entity';
import { CreateDayDto } from './dto/create-day.dto';
import { Day } from './entities/day.entity';
import { DayService } from './day.service';

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
    return this.dayService.findByPK(id, { relations: ['tasks', 'feedback'] });
  }

  @Patch(':id/views')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'Increase day views' })
  increaseViews(@Param('id', ParseIntPipe) id: number) {
    // todo only auth
    return this.dayService.increaseViews(id);
  }
}
