import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FileService } from 'src/file/file.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileService: FileService,
  ) {}

  async findOne(conditions: FindConditions<User>) {
    return await this.userRepository.findOneOrFail(conditions);
  }

  async create(dto: CreateUserDto, file: Express.Multer.File) {
    const avatar = await this.fileService.uploadImage(file, { width: 500 });

    return await this.userRepository.save({ ...dto, avatar });
  }
}
