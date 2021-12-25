import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AddFollowingDto } from './dto/add-following.dto';
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

  async find(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  async findByPK(id: number, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ id }, options);
  }

  async findByNickname(nickname: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ nickname }, options);
  }

  async addFollowing(id: number, dto: AddFollowingDto) {
    const user = await this.findByPK(id, { relations: ['subscription'] });
    const following = await this.findByPK(dto.following, { relations: ['subscription', 'characteristic'] });

    user.subscription.following.push(dto.following);
    following.subscription.followers.push(user.id);
    following.characteristic.followers += 1;

    await this.userRepository.save(user);
    await this.userRepository.save(following);
  }

  async deleteFollowing(id: number, followingId: number) {
    const user = await this.findByPK(id, { relations: ['subscription'] });
    const following = await this.findByPK(followingId, { relations: ['subscription', 'characteristic'] });

    user.subscription.following = user.subscription.following.filter((f) => f !== followingId);
    following.subscription.followers = user.subscription.followers.filter((f) => f !== user.id);
    following.characteristic.followers -= 1;

    await this.userRepository.save(user);
    await this.userRepository.save(following);
  }

  async save(dto: CreateUserDto, file: Express.Multer.File) {
    const user = new User();
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.avatar = await this.fileService.uploadImage(file, { width: 500 });
    user.characteristic = new UserCharacteristic();
    user.subscription = new Subscription();

    return this.userRepository.save(user);
  }
}
