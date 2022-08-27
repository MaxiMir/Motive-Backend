import {
  Body,
  Controller,
  HttpCode,
  Param,
  Query,
  Get,
  Post,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OperationDto, OPERATIONS } from 'src/common/operation.dto';
import { CharacteristicDto, CHARACTERISTICS } from 'src/common/characteristic.dto';
import { ParseCharacteristicPipe } from 'src/pipes/parse-characteristic.pipe';
import { parseInsertOperationPipe } from 'src/pipes/parse-insert-operation.pipe';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CalendarDto } from './dto/calendar.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { GoalEntity } from './entities/goal.entity';
import { GoalService } from './goal.service';

@Controller('goals')
@ApiTags('Goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: GoalEntity })
  save(@Body() dto: CreateGoalDto, @Identify() clientId: number) {
    return this.goalService.save(dto, clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({ status: 200, type: GoalEntity })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findByPK(id);
  }

  @Get(':id/calendar')
  @ApiOperation({ summary: 'Get calendar' })
  @ApiResponse({ status: 200, type: [CalendarDto] })
  findCalendar(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findCalendar(id);
  }

  @Post(':id/days')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiOperation({ summary: 'Add day' })
  @ApiResponse({ status: 200, type: GoalEntity })
  addDay(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateDayDto, @Identify() clientId: number) {
    return this.goalService.addDay(id, dto, clientId);
  }

  @Patch(':id/stage')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'Change stage' })
  @ApiResponse({ status: 204 })
  updateStage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStageDto,
    @Identify() clientId: number,
  ) {
    return this.goalService.updateStage(id, dto, clientId);
  }

  @Patch(':id/days/:dayId/characteristic/:characteristic')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'Update day characteristic' })
  @ApiParam({ name: 'characteristic', enum: CHARACTERISTICS })
  @ApiQuery({ name: 'operation', example: OPERATIONS[0] })
  @ApiResponse({ status: 204 })
  updateCharacteristic(
    @Param('id', ParseIntPipe) id: number,
    @Param('dayId', ParseIntPipe) dayId: number,
    @Param('characteristic', ParseCharacteristicPipe) characteristic: CharacteristicDto,
    @Query('operation', parseInsertOperationPipe) operation: OperationDto,
    @Identify() clientId: number,
  ) {
    return this.goalService.updateCharacteristic(id, dayId, characteristic, clientId);
  }
}
