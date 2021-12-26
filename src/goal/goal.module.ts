import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
  imports: [UserModule, DayModule, HashtagModule, TypeOrmModule.forFeature([Goal])],
})
export class GoalModule {}
