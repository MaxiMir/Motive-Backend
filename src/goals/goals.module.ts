import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsController } from './controllers/goals.controller';
import { GoalsService } from './service/goals.service';
import { Goal } from './entities/goal.entity';

@Module({
  controllers: [GoalsController],
  providers: [GoalsService],
  imports: [TypeOrmModule.forFeature([Goal])],
})
export class GoalsModule {}
