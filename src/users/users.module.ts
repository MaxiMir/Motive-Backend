import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { FilesService } from 'src/files/services/files.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FilesService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
