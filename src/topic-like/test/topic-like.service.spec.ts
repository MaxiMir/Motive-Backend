import { Test, TestingModule } from '@nestjs/testing';
import { TopicLikeService } from 'src/topic-like/topic-like.service';

describe('TopicLikeService', () => {
  let service: TopicLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicLikeService],
    }).compile();

    service = module.get<TopicLikeService>(TopicLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
