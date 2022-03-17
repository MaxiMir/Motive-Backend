import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalModule } from 'src/goal/goal.module';
import { UserModule } from 'src/user/user.module';
import { FileModule } from 'src/file/file.module';
import { ExpModule } from 'src/exp/exp.module';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationController } from './confirmation.controller';
import { Confirmation } from './entities/confirmation.entity';

@Module({
  controllers: [ConfirmationController],
  imports: [TypeOrmModule.forFeature([Confirmation]), UserModule, GoalModule, ExpModule, FileModule],
  providers: [ConfirmationService],
})
export class ConfirmationModule {}
