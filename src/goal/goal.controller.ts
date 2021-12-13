import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getRepository } from 'typeorm';
import { CreateGoalDto } from './dto/create-goal.dto';
import { User } from 'src/user/user.entity';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';

@Controller('goals')
@ApiTags('Goals')
export class GoalController {
  constructor(public service: GoalService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({ status: 200, type: Goal })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  async create(@Body() dto: CreateGoalDto) {
    const userRepository = getRepository(User); // Временно
    const goalRepository = getRepository(Goal); // Временно
    const owner = await userRepository.findOne(1);
    console.log(
      dto.hashtags
        .replaceAll('#', '')
        .split(' ')
        .filter(Boolean)
        .map((s) => s.trim()),
    );

    return goalRepository.save({
      name: dto.name,
      // hashtags: [],
      day: [
        {
          // date: '',
          tasks: dto.tasks,
        },
      ],
      owner,
    });
  }

  // TODO datesMAP
}
