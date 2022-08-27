import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from './entities/reaction.entity';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { ReactionSubscriber } from './reaction.subscriber';

@Module({
  controllers: [ReactionController],
  providers: [ReactionService, ReactionSubscriber],
  imports: [TypeOrmModule.forFeature([ReactionEntity])],
  exports: [ReactionService],
})
export class ReactionModule {}
