import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/file/files.module';
import { Unique } from 'src/validators/unique';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [Unique, UserService],
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  exports: [UserService],
})
export class UserModule {}
