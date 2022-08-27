import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { Unique } from 'src/validators/unique';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [Unique, UserService],
  imports: [TypeOrmModule.forFeature([UserEntity]), FileModule],
  exports: [UserService],
})
export class UserModule {}
