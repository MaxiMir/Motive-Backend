import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // favorite: boolean
    // role: Role
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}
