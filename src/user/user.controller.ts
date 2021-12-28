import { Controller, UploadedFile, Query, Param, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiImageFile('avatar', true)
  @ApiResponse({ status: 201, type: User })
  create(@Query() dto: CreateUserDto, @UploadedFile(ParseFile) file: Express.Multer.File) {
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
