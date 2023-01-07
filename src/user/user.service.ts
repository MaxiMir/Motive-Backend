import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristicEntity } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fileService: FileService,
  ) {}

  getRepository() {
    return this.userRepository;
  }

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    user.nickname = crypto.randomUUID();
    user.characteristic = new UserCharacteristicEntity();

    return this.userRepository.save(user);
  }

  async update(dto: UpdateUserDto, userId: number) {
    const user = await this.findByPK(userId);
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.motto = dto.motto;
    user.location = dto.location;
    user.bio = dto.bio;
    user.registered = new Date().toISOString();

    return this.userRepository.save(user);
  }

  async updateAvatar(file: Express.Multer.File, userId: number) {
    const user = await this.findByPK(userId);
    const deletedAvatar = user.avatar;
    const newAvatar = await this.fileService.uploadImage(file, 'avatars', { width: 1280 });
    user.avatar = newAvatar.src;

    if (deletedAvatar) {
      this.fileService.removeImage(deletedAvatar);
    }

    return this.userRepository.save(user);
  }

  async deleteAvatar(userId: number) {
    const user = await this.findByPK(userId);
    const deletedAvatar = user.avatar;
    user.avatar = null;

    if (deletedAvatar) {
      this.fileService.removeImage(deletedAvatar);
    }

    return this.userRepository.save(user);
  }

  find(query: FindQueryDto, relations?: string[]) {
    const { where, take, skip } = query;

    return this.userRepository.find({ relations, where, take, skip });
  }

  findByPK(id: number, options?: FindOneOptions<UserEntity>) {
    return this.userRepository.findOneOrFail({ id }, options);
  }
}
