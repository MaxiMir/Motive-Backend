import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { DayModule } from 'src/day/day.module';
import { UserModule } from 'src/user/user.module';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [TypeOrmModule.forFeature([Topic]), UserModule, DayModule],
})
export class TopicModule {}
