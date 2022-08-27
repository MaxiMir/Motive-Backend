import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagEntity } from './entities/hashtag.entity';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  imports: [TypeOrmModule.forFeature([HashtagEntity])],
  exports: [HashtagService],
})
export class HashtagModule {}
