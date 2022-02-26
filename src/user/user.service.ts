import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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

  async createOrFind(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (candidate) {
      return candidate;
    }

    const user = this.userRepository.create(dto);
    user.nickname = [dto.name, '-', dto.sub].join('').toLowerCase();
    user.characteristic = new UserCharacteristic();

    return this.userRepository.save(user);
  }

  async update(dto: UpdateUserDto, file: Express.Multer.File, clientId: number) {
    const user = await this.findByPK(clientId);
    user.name = dto.name;
    user.nickname = dto.nickname;

    if (file) {
      // todo remove old image
      const avatar = await this.fileService.uploadImage(file, 'avatars', { width: 500 });
      user.avatar = avatar.replace(`/${process.env.STATIC_FOLDER}`, '');
    }

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
