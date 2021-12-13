import { Test, TestingModule } from '@nestjs/testing';
import { GoalCharacteristicService } from 'src/goal-characteristic/goal-characteristic.service';

describe('GoalCharacteristicService', () => {
  let service: GoalCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalCharacteristicService],
    }).compile();

    service = module.get<GoalCharacteristicService>(GoalCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
