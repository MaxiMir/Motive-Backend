import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './entities/member.entity';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { GoalModule } from 'src/goal/goal.module';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [TypeOrmModule.forFeature([MemberEntity]), UserModule, GoalModule, DayModule],
  exports: [MemberService],
})
export class MemberModule {}
