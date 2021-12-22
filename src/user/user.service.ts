import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateFollowingDto } from './dto/update-favorite.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
  ) {}

  getRepository() {
    return this.userRepository;
  }

  async findAll(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  async findByPK(id: number, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ id }, options);
  }

  async findByNickname(nickname: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ nickname }, options);
  }

  async save(dto: CreateUserDto, file: Express.Multer.File) {
    const user = new User();
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.avatar = await this.fileService.uploadImage(file, { width: 500 });
    user.characteristic = new UserCharacteristic();

    return this.userRepository.save(user);
  }

  async updateFollowing(id: number, dto: UpdateFollowingDto) {
    const user = await this.findByPK(id, { relations: ['following'] });
    const following = await this.findByPK(dto.following, { relations: ['characteristic'] });

    switch (dto.op) {
      case 'add':
        user.following.push(following);
        following.characteristic.followers += 1;
        break;
      case 'remove':
        user.following = user.following.filter((f) => f.id !== dto.following);
        following.characteristic.followers -= 1;
        break;
    }

    await this.userRepository.save(following);
    await this.userRepository.save(user);
  }
}
