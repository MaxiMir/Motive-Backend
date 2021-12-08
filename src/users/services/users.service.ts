import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async getById(id: string) {
    // favorite: boolean
    // role: Role
    return await this.findOne({ id });
  }

  async createUser(dto: CreateUserDto) {
    const userRepository = getRepository(User);
    return await userRepository.save(dto);
  }
}
