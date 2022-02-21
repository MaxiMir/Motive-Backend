import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { Unique } from 'src/validators/unique';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [Unique, UserService],
  imports: [TypeOrmModule.forFeature([User]), FileModule],
  exports: [UserService],
})
export class UserModule {}
