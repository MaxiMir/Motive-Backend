import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FilesService } from 'src/files/services/files.service';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) usersRepository: Repository<User>,
    private filesService: FilesService,
  ) {
    super(usersRepository);
  }

  async getById(id: string) {
    // favorite: boolean
    // role: Role
    return await this.findOne(
      { id },
      { relations: ['characteristic', 'goals'] },
    );
  }

  async createUser(dto: CreateUserDto, file: Express.Multer.File) {
    const avatar = await this.filesService.create(file);
    const userRepository = getRepository(User);
    return await userRepository.save({ ...dto, avatar, characteristic: {} });
  }
}
