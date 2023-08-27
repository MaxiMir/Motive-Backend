import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FileService } from 'src/file/file.service';
import { UserCharacteristicEntity } from 'src/user-characteristic/entities/user-characteristic.entity';
import { ExpService } from 'src/exp/exp.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fileService: FileService,
    private readonly expService: ExpService,
  ) {}

  getRepository() {
    return this.userRepository;
  }

  async create(dto: CreateUserDto) {
    const [lastUser] = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
      take: 1,
    });
    const user = this.userRepository.create(dto);
    user.nickname = `id${(lastUser?.id || 0) + 1}`;
    user.characteristic = new UserCharacteristicEntity();
    user.characteristic.nextLevelPoints = this.expService.toLevel(2);

    return this.userRepository.save(user);
  }

  async update(dto: UpdateUserDto, userId: number) {
    const user = await this.findByPK(userId);
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.motto = dto.motto;
    user.location = dto.location;
    user.bio = dto.bio;

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

    if (!user.avatar) return;

    this.fileService.removeImage(user.avatar);
    user.avatar = null;

    return this.userRepository.save(user);
  }

  async updateCharacteristic(dto: UpdateCharacteristicDto, userId: number) {
    const user = await this.findByPK(userId, { relations: ['characteristic'] });
    user.characteristic[dto.name] = dto.value;

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
