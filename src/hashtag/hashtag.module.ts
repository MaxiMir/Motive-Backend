import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { Hashtag } from './hashtag.entity';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  imports: [TypeOrmModule.forFeature([Hashtag])],
})
export class HashtagModule {}
