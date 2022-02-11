import { Controller, UploadedFile, Body, Param, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserBaseDto } from './dto/user-base.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'nickname', 'avatar'],
      properties: {
        name: { type: 'string', example: 'Maxim Minchenko' },
        nickname: { type: 'string', example: 'maximir' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiImageFile('avatar')
  @ApiResponse({ status: 201, type: User })
  save(@Body() dto: CreateUserDto, @UploadedFile(ParseFile) file: Express.Multer.File) {
    return this.userService.save(dto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [UserBaseDto] })
  getAll() {
    return this.userService.find();
  }

  @Get(':nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiResponse({ status: 200, type: UserBaseDto })
  getByNickname(@Param('nickname') nickname: string) {
    return this.userService.findByNickname(nickname);
  }
}
