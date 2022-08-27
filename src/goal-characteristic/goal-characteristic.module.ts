import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalCharacteristicEntity } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { GoalCharacteristicController } from './goal-characteristic.controller';
import { GoalCharacteristicService } from './goal-characteristic.service';

@Module({
  controllers: [GoalCharacteristicController],
  providers: [GoalCharacteristicService],
  imports: [TypeOrmModule.forFeature([GoalCharacteristicEntity])],
})
export class GoalCharacteristicModule {}
