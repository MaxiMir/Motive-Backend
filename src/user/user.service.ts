import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
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

  getRepository() {
    return this.userRepository;
  }

  async save(dto: CreateUserDto, file: Express.Multer.File) {
    const avatar = await this.fileService.uploadImage(file, 'avatars', { width: 500 });
    const user = new User();
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.avatar = avatar.replace(`/${process.env.STATIC_FOLDER}`, '');
    user.characteristic = new UserCharacteristic();

    return this.userRepository.save(user);
  }

  find(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  findByPK(id: number, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ id }, options);
  }

  findByNickname(nickname: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ nickname }, options);
  }
}
