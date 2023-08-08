import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { TopicLikeModule } from 'src/topic-like/topic-like.module';
import { TopicEntity } from './entities/topic.entity';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicSubscriber } from './topic.subscriber';

@Module({
  controllers: [TopicController],
  providers: [TopicService, TopicSubscriber],
  imports: [TypeOrmModule.forFeature([TopicEntity]), UserModule, DayModule, TopicLikeModule],
})
export class TopicModule {}
