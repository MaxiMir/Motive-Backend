import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
  ) {}

  async findByPK(id: number, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ id }, options);
  }

  async findByNickname(nickname: string, options?: FindOneOptions<User>) {
    return await this.userRepository.findOneOrFail({ nickname }, options);
  }

  async save(dto: CreateUserDto, file: Express.Multer.File) {
    const user = new User();
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.avatar = await this.fileService.uploadImage(file, { width: 500 });
    user.characteristic = new UserCharacteristic();

    return await this.userRepository.save(user);
  }

  async addFollowing(id: number, followingId: number) {
    const user = await this.findByPK(id);
    const following = await this.findByPK(followingId);
    user.following.push(following);

    return this.userRepository.save(user);
  }

  async removeFollowing(id: number, followingId: number) {
    const user = await this.findByPK(id);
    user.following = user.following.filter((f) => f.id !== followingId);

    return this.userRepository.save(user);
  }
}
