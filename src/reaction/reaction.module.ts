import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { Reaction } from './reaction.entity';

@Module({
  controllers: [ReactionController],
  providers: [ReactionService],
  imports: [TypeOrmModule.forFeature([Reaction])],
  exports: [ReactionService],
})
export class ReactionModule {}
