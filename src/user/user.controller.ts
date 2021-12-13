import {
  Controller,
  Param,
  UploadedFile,
  Query,
  Get,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(public service: UserService) {}

  @Get(':nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('nickname') nickname: string) {
    return this.service.findOne(nickname);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiImageFile('avatar', true)
  @ApiResponse({ status: 201, type: User })
  async create(
    @Query() dto: CreateUserDto,
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ) {
    return this.service.create(dto, file);
  }
}
