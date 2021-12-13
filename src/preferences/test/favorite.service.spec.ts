import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from 'src/preferences/preferences.service';

describe('FavoriteService', () => {
  let service: PreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferencesService],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});