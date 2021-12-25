import { Module } from '@nestjs/common';
import { GoalCharacteristicService } from './goal-characteristic.service';
import { GoalCharacteristicController } from './goal-characteristic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';

@Module({
  controllers: [GoalCharacteristicController],
  providers: [GoalCharacteristicService],
  imports: [TypeOrmModule.forFeature([GoalCharacteristic])],
})
export class GoalCharacteristicModule {}
