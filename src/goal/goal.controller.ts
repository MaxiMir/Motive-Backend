import { Body, Controller, HttpCode, Param, Query, ParseIntPipe, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
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

  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  create(@Body() dto: CreateGoalDto) {
    const clientId = 1; // TODO временно

    return this.goalService.save(clientId, dto);
  }

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

  @Post(':id/:dayId/:characteristic')
  @HttpCode(204)
  @ApiOperation({ summary: 'update day characteristic' })
  @ApiParam({ name: 'characteristic', enum: CHARACTERISTICS })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  updateCharacteristic(
    @Param('id', ParseIntPipe) id: number,
    @Param('dayId', ParseIntPipe) dayId: number,
    @Param('characteristic', ParseCharacteristicPipe) characteristic: Characteristic,
    @Query('operation', ParseOperationPipe) operation: Operation,
  ) {
    const clientId = 1; // TODO временно

    return this.goalService.updateCharacteristic(clientId, id, dayId, characteristic, operation);
  }
}
