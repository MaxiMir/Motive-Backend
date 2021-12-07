import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/CreateUserDto';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Get(':id')
  async findOne(@Param() params) {
    return this.service.getById(params.id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}
