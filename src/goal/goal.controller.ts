import {
  Body,
  Controller,
  HttpCode,
  Param,
  Query,
  Get,
  Post,
  Patch,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { ParseCharacteristicPipe } from 'src/pipes/parse-characteristic.pipe';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CalendarDto } from './dto/calendar.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { UpdateCompletedDto } from './dto/update-completed.dto';
import { Goal } from './entities/goal.entity';
import { GoalService } from './goal.service';

@Controller('goals')
@ApiTags('Goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  save(@Body() dto: CreateGoalDto) {
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
  @ApiResponse({ status: 200, type: [CalendarDto] })
  getCalendar(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findCalendar(id);
  }

  @Post(':id/days')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add day' })
  @ApiResponse({ status: 200, type: Goal })
  addDay(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateDayDto) {
    const clientId = 1; // TODO временно

    return this.goalService.addDay(id, dto);
  }

  @Patch(':id/stage')
  @HttpCode(204)
  @ApiOperation({ summary: 'Change stage' })
  @ApiResponse({ status: 204 })
  updateStage(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStageDto) {
    const clientId = 1; // TODO временно

    return this.goalService.updateStage(id, dto);
  }

  @Patch(':id/completed')
  @HttpCode(204)
  @ApiOperation({ summary: 'Make the goal complete' })
  @ApiResponse({ status: 204 })
  updateCompleted(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompletedDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const clientId = 1; // TODO временно

    return this.goalService.updateCompleted(id, dto, files);
  }

  @Patch(':id/days/:dayId/characteristic/:characteristic')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update day characteristic' })
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
