import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { ExpModule } from 'src/exp/exp.module';
import { Unique } from 'src/validators/unique';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';

@Module({
  controllers: [UserController],
  providers: [Unique, UserService, UserSubscriber],
  imports: [TypeOrmModule.forFeature([UserEntity]), FileModule, ExpModule],
  exports: [UserService],
})
export class UserModule {}
