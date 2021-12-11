import {
  Controller,
  Param,
  UploadedFile,
  Query,
  Get,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { ParseFile } from 'src/pipes/parse-file.pipe';

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
  @ApiOperation({ summary: 'Create user' })
  @ApiImageFile('avatar', true)
  @ApiResponse({ status: 201, type: User })
  async create(
    @Query() dto: CreateUserDto,
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ) {
    return this.service.createUser(dto, file);
  }
}
