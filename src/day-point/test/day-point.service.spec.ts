import { Test, TestingModule } from '@nestjs/testing';
import { DayPointService } from 'src/day-point/day-point.service';

describe('DayPointService', () => {
  let service: DayPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayPointService],
    }).compile();

    service = module.get<DayPointService>(DayPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
