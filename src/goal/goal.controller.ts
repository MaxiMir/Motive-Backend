import { Body, Controller, HttpCode, Param, Query, ParseIntPipe, Get, Post, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { ParseCharacteristicPipe } from 'src/pipes/parse-characteristic.pipe';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CalendarDto } from './dto/calendar.dto';
import { GoalStageDto } from './dto/goal-stage.dto';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';

@Controller('goals')
@ApiTags('Goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  save(@Body() dto: CreateGoalDto) {
    const clientID = 1; // TODO временно

    return this.goalService.save(clientID, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({ status: 200, type: Goal })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findByPK(id);
  }

  @Get(':id/calendar')
  @ApiOperation({ summary: 'Get calendar' })
  @ApiResponse({ status: 200, type: [CalendarDto] })
  getCalendar(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findCalendar(id);
  }

  @Post(':id/days')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add day' })
  @ApiResponse({ status: 200, type: Goal })
  addDay(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateDayDto) {
    return this.goalService.addDay(id, dto);
  }

  @Patch(':id/stage')
  @HttpCode(204)
  @ApiOperation({ summary: 'Change stage' })
  updateStage(@Param('id', ParseIntPipe) id: number, @Body() dto: GoalStageDto) {
    return this.goalService.updateStage(id, dto);
  }

  @Patch(':id/days/:dayID/characteristic/:characteristic')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update day characteristic' })
  @ApiParam({ name: 'characteristic', enum: CHARACTERISTICS })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  updateCharacteristic(
    @Param('id', ParseIntPipe) id: number,
    @Param('dayID', ParseIntPipe) dayID: number,
    @Param('characteristic', ParseCharacteristicPipe) characteristic: Characteristic,
    @Query('operation', ParseOperationPipe) operation: Operation,
  ) {
    const clientID = 1; // TODO временно

    return this.goalService.updateCharacteristic(clientID, id, dayID, characteristic, operation);
  }
}
