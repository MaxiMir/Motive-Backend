import { Test, TestingModule } from '@nestjs/testing';
import { CharacteristicService } from 'src/characteristic/characteristic.service';

describe('CharacteristicsService', () => {
  let service: CharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacteristicService],
    }).compile();

    service = module.get<CharacteristicService>(CharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
