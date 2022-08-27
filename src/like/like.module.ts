import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  exports: [LikeService],
})
export class LikeModule {}
