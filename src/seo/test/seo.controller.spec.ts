import { Test, TestingModule } from '@nestjs/testing';
import { SeoController } from 'src/seo/seo.controller';
import { SeoService } from 'src/seo/seo.service';

describe('SeoController', () => {
  let controller: SeoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoController],
      providers: [SeoService],
    }).compile();

    controller = module.get<SeoController>(SeoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
