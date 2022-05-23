import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { ExpModule } from 'src/exp/exp.module';
import { FileModule } from 'src/file/file.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { Goal } from './entities/goal.entity';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { GoalSubscriber } from './goal.subscriber';

@Module({
  controllers: [GoalController],
  providers: [GoalService, GoalSubscriber],
  imports: [
    TypeOrmModule.forFeature([Goal]),
    UserModule,
    DayModule,
    SubscriptionModule,
    ExpModule,
    FileModule,
    SubscriptionModule,
  ],
  exports: [GoalService],
})
export class GoalModule {}
