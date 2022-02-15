import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';

@Module({
  controllers: [ReactionController],
  providers: [ReactionService],
  imports: [TypeOrmModule.forFeature([Reaction])],
  exports: [ReactionService],
})
export class ReactionModule {}
