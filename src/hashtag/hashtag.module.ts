import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  imports: [TypeOrmModule.forFeature([Hashtag])],
  exports: [HashtagService],
})
export class HashtagModule {}
