import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { ExpModule } from 'src/exp/exp.module';
import { FileModule } from 'src/file/file.module';
import { Goal } from './entities/goal.entity';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
  imports: [TypeOrmModule.forFeature([Goal]), UserModule, DayModule, ExpModule, FileModule],
  exports: [GoalService],
})
export class GoalModule {}
