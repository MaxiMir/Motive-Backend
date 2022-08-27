import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalModule } from 'src/goal/goal.module';
import { UserModule } from 'src/user/user.module';
import { MemberModule } from 'src/member/member.module';
import { FileModule } from 'src/file/file.module';
import { ExpModule } from 'src/exp/exp.module';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationController } from './confirmation.controller';
import { ConfirmationEntity } from './entities/confirmation.entity';

@Module({
  controllers: [ConfirmationController],
  imports: [
    TypeOrmModule.forFeature([ConfirmationEntity]),
    UserModule,
    GoalModule,
    MemberModule,
    ExpModule,
    FileModule,
  ],
  providers: [ConfirmationService],
})
export class ConfirmationModule {}
