import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { Characteristic } from 'src/abstracts/characteristic';
import { ParseCharacteristicPipe } from 'src/pipes/parse-characteristic.pipe';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
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
    const clientId = 1; // TODO временно

    return this.goalService.save(clientId, dto);
  }

  @Post(':goalId/:dayId/:characteristic/:operation')
  @HttpCode(204)
  @ApiOperation({ summary: 'update day characteristic' })
  @ApiParam({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  updateCharacteristic(
    @Param('goalId', ParseIntPipe) goalId: number,
    @Param('dayId', ParseIntPipe) dayId: number,
    @Param('characteristic', ParseCharacteristicPipe) characteristic: Characteristic,
    @Param('operation', ParseOperationPipe) operation: Operation,
  ) {
    const clientId = 1; // TODO временно

    return this.goalService.updateCharacteristic(clientId, goalId, dayId, characteristic, operation);
  }
}
