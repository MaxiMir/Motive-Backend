import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { LikeModule } from 'src/like/like.module';
import { ExpModule } from 'src/exp/exp.module';
import { Topic } from './entities/topic.entity';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicSubscriber } from './topic.subscriber';

@Module({
  controllers: [TopicController],
  providers: [TopicService, TopicSubscriber],
  imports: [TypeOrmModule.forFeature([Topic]), UserModule, DayModule, LikeModule, ExpModule],
})
export class TopicModule {}
