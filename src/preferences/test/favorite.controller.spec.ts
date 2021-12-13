import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteController } from 'src/preferences/preferences.controller';
import { PreferencesService } from 'src/preferences/preferences.service';

describe('FavoriteController', () => {
  let controller: FavoriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [PreferencesService],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
