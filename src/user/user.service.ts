import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async findOne(nickname: string) {
    return await this.userRepository.find({ nickname });
  }

  async create(dto: CreateUserDto, file: Express.Multer.File) {
    const avatar = await this.fileService.create(file);

    return await this.userRepository.save({ ...dto, avatar });
  }
}
