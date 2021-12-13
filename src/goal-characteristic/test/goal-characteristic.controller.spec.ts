import { Test, TestingModule } from '@nestjs/testing';
import { GoalCharacteristicController } from 'src/goal-characteristic/goal-characteristic.controller';
import { GoalCharacteristicService } from 'src/goal-characteristic/goal-characteristic.service';

describe('GoalCharacteristicController', () => {
  let controller: GoalCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalCharacteristicController],
      providers: [GoalCharacteristicService],
    }).compile();

    controller = module.get<GoalCharacteristicController>(
      GoalCharacteristicController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
