import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/file/files.module';
import { Unique } from 'src/validators/unique';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [Unique, UserService],
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  exports: [UserService],
})
export class UserModule {}
