import { Test, TestingModule } from '@nestjs/testing';
import { DayCharacteristicController } from 'src/day-characteristic/day-characteristic.controller';

describe('DayCharacteristicController', () => {
  let controller: DayCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayCharacteristicController],
    }).compile();

    controller = module.get<DayCharacteristicController>(DayCharacteristicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
