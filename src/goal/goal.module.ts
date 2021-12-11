import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
  imports: [TypeOrmModule.forFeature([Goal])],
})
export class GoalModule {}
