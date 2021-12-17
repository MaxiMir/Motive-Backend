import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByNickname(nickname: string, options?: FindOneOptions<User>) {
    return await this.userRepository.findOneOrFail({ nickname }, options);
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }
}
