import { Controller, UploadedFile, Body, Param, Get, Post, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserBaseDto } from './dto/user-base.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create or find user' })
  @ApiResponse({ status: 201, type: User })
  createOrFind(@Body() dto: CreateUserDto) {
    return this.userService.createOrFind(dto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user' })
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
  update(
    @Body() dto: UpdateUserDto,
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @Identify() clientId: number,
  ) {
    return this.userService.update(dto, file, clientId);
  }

  @Get(':nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiResponse({ status: 200, type: UserBaseDto })
  findByNickname(@Param('nickname') nickname: string) {
    return this.userService.findByNickname(nickname);
  }
}
