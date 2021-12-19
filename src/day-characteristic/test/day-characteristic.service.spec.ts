import { Test, TestingModule } from '@nestjs/testing';
import { DayCharacteristicService } from 'src/day-characteristic/day-characteristic.service';

describe('DayCharacteristicService', () => {
  let service: DayCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayCharacteristicService],
    }).compile();

    service = module.get<DayCharacteristicService>(DayCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
