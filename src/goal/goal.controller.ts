import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CalendarDto } from './dto/calendar.dto';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';

@Controller('goals')
@ApiTags('Goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({ status: 200, type: Goal })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findByPK(id);
  }

  @Get(':id/calendar')
  @ApiOperation({ summary: 'Get calendar' })
  @ApiResponse({ status: 200, type: CalendarDto })
  getCalendar(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findDates(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  create(@Body() dto: CreateGoalDto) {
    return this.goalService.save(dto);
  }
}
