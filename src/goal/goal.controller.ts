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
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';
import { User } from 'src/user/user.entity';

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
    const user = await userRepository.findOne('maximir');
    return goalRepository.save({
      ...dto,
      hashtags: [
        'foreignLanguage',
        'knowledge',
        'learnFrench',
        'immigration',
        'recommendation',
      ],
      owner: user,
    });
  }
}
