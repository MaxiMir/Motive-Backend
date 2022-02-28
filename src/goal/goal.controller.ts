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
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
import { ParseCharacteristicPipe } from 'src/pipes/parse-characteristic.pipe';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { ApiImageFiles } from 'src/decorators/api-images.decorator';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CalendarDto } from './dto/calendar.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { UpdateCompletedDto } from './dto/update-completed.dto';
import { Goal } from './entities/goal.entity';
import { GoalService } from './goal.service';
import { FindQuery } from './dto/find-query';

@Controller('goals')
@ApiTags('Goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  save(@Body() dto: CreateGoalDto, @Identify() clientId: number) {
    return this.goalService.save(dto, clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({ status: 200, type: Goal })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findByPK(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get goals' })
  @ApiPagination({ name: 'where[owner]', example: 1 })
  @ApiResponse({ status: 200, type: [Goal] })
  find(@Query() query: FindQuery) {
    return this.goalService.find(query);
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
  @ApiResponse({ status: 200, type: Goal })
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

  @Patch(':id/confirmation')
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        text: { type: 'string' },
        photos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiImageFiles('photos')
  @HttpCode(204)
  @ApiOperation({ summary: 'Make the goal complete' })
  @ApiResponse({ status: 204 })
  updateConfirmation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompletedDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Identify() clientId: number,
  ) {
    return this.goalService.updateConfirmation(id, dto, files, clientId);
  }

  @Patch(':id/days/:dayId/characteristic/:characteristic')
  @UseGuards(AuthGuard)
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
    @Identify() clientId: number,
  ) {
    return this.goalService.updateCharacteristic(id, dayId, characteristic, operation, clientId);
  }
}
