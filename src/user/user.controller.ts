import { Controller, UploadedFile, Query, Param, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { FileService } from 'src/file/file.service';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly fileService: FileService) {}

  @Get(':nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiResponse({ status: 200, type: User })
  async findByNickname(@Param('nickname') nickname: string) {
    return this.userService.findOne(nickname);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiImageFile('avatar', true)
  @ApiResponse({ status: 201, type: User })
  async create(@Query() dto: CreateUserDto, @UploadedFile(ParseFile) file: Express.Multer.File) {
    const user = new User();
    user.name = dto.name;
    user.nickname = dto.nickname;
    user.avatar = await this.fileService.uploadImage(file, { width: 500 });
    user.characteristic = new UserCharacteristic();
    user.goals = [];

    return this.userService.save(user);
  }
}
