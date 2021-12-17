import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getRepository } from 'typeorm';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { User } from 'src/user/user.entity';
import { Day } from 'src/day/day.entity';
import { Hashtag } from 'src/hashtag/hashtag.entity';
import { Task } from 'src/task/task.entity';
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

  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, type: Goal })
  async create(@Body() dto: CreateGoalDto) {
    const goal = new Goal();
    const day = new Day();

    goal.name = dto.name;
    goal.characteristic = new GoalCharacteristic();
    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = name;
      task.date = date;

      return task;
    });
    goal.days = [day];
    goal.hashtags = dto.hashtags.map((name) => {
      const hashtag = new Hashtag();
      hashtag.name = name;

      return hashtag;
    });

    const userRepository = getRepository(User); // !!! Временно
    goal.owner = (await userRepository.findOne(1)) as User;

    return this.goalService.save(goal);
  }
}
