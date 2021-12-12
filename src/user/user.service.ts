import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { FileService } from 'src/file/file.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileService: FileService,
  ) {
    super(userRepository);
  }

  async findById(id: string) {
    return await this.findOne({ id });
  }

  async create(dto: CreateUserDto, file: Express.Multer.File) {
    const avatar = await this.fileService.create(file);

    return await this.userRepository.save({
      ...dto,
      avatar,
      characteristic: {},
    });
  }
}
