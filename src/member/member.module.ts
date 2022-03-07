import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [TypeOrmModule.forFeature([Member])],
})
export class MemberModule {}
