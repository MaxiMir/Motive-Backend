import {
  Body,
  Controller,
  Param,
  UseInterceptors,
  UploadedFile,
  Get,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['id', 'name', 'avatar'],
    },
  })
  @ApiResponse({ status: 200, type: User })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateUserDto,
  ) {
    return this.service.createUser(dto, file);
  }
}
