import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/CreateUserDto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async getById(nickname: string) {
    return await this.findOne({ nickname });
  }

  async createUser(dto: CreateUserDto) {
    const userRepository = getRepository(User);
    return await userRepository.save(dto);
  }
}
