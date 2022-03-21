import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindQuery } from './dto/find-query.dto';
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

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    user.nickname = [dto.name.replace(' ', '_'), '-', dto.sub].join('').toLowerCase();
    user.characteristic = new UserCharacteristic();

    return this.userRepository.save(user);
  }

  async update(dto: UpdateUserDto, file: Express.Multer.File, userId: number) {
    const user = await this.findByPK(userId);
    const lastAvatar = user.avatar;
    user.name = dto.name;
    user.nickname = dto.nickname;

    if (file) {
      const avatar = await this.fileService.uploadImage(file, 'avatars', { width: 500 });
      user.avatar = avatar.replace(`/${process.env.STATIC_FOLDER}`, '');
    }

    if (file && lastAvatar) {
      this.fileService.removeImage(lastAvatar);
    }

    return this.userRepository.save(user);
  }

  find(query: FindQuery, relations?: string[]) {
    const { where, take, skip } = query;

    return this.userRepository.find({
      relations,
      where,
      take,
      skip,
    });
  }

  findByPK(id: number, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ id }, options);
  }

  findByNickname(nickname: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ nickname }, options);
  }
}
