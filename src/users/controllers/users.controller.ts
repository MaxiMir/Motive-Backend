import {
  Body,
  Controller,
  Param,
  UploadedFile,
  Get,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string) {
    // favorite: boolean
    // role: Role
    return this.service.getById(id);
  }

  @Post()
  @ApiParam({
    name: 'name',
    example: 'Maxim Minchenko',
    description: 'name',
  })
  @ApiParam({
    name: 'id',
    example: 'maximir',
    description: 'nickname',
  })
  @ApiOperation({ summary: 'Create user' })
  @ApiImageFile('avatar', true)
  @ApiResponse({ status: 201, type: User })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateUserDto,
  ) {
    console.log(dto);
    return this.service.createUser(dto, file);
  }
}
