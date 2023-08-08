import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicLikeEntity } from './entities/topic-like.entity';
import { TopicLikeController } from './topic-like.controller';
import { TopicLikeService } from './topic-like.service';

@Module({
  controllers: [TopicLikeController],
  providers: [TopicLikeService],
  imports: [TypeOrmModule.forFeature([TopicLikeEntity])],
  exports: [TopicLikeService],
})
export class TopicLikeModule {}
