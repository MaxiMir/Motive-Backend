import { Module } from '@nestjs/common';
import { GoalCharacteristicService } from './goal-characteristic.service';
import { GoalCharacteristicController } from './goal-characteristic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalCharacteristic])],
  providers: [GoalCharacteristicService],
  controllers: [GoalCharacteristicController],
})
export class GoalCharacteristicModule {}
