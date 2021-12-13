import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { Hashtag } from './hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  providers: [HashtagService],
  controllers: [HashtagController],
})
export class HashtagModule {}
