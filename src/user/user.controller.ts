import {
  Controller,
  UploadedFile,
  Query,
  Param,
  Get,
  Post,
  HttpCode,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { AddFollowingDto } from './dto/add-following.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  getAll() {
    return this.userService.findAll();
  }

  @Get(':nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiResponse({ status: 200, type: User })
  getByNickname(@Param('nickname') nickname: string) {
    return this.userService.findByNickname(nickname);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiImageFile('avatar', true)
  @ApiResponse({ status: 201, type: User })
  create(@Query() dto: CreateUserDto, @UploadedFile(ParseFile) file: Express.Multer.File) {
    return this.userService.save(dto, file);
  }

  // FOLLOWING:

  @Post(':id/following')
  @HttpCode(204)
  @ApiOperation({ summary: 'add following' })
  @ApiResponse({ status: 204 })
  addFollowing(@Param('id', ParseIntPipe) id: number, @Body() dto: AddFollowingDto) {
    return this.userService.addFollowing(id, dto);
  }

  @Delete(':id/following/:following')
  @HttpCode(204)
  @ApiOperation({ summary: 'delete following' })
  @ApiResponse({ status: 204 })
  deleteFollowing(
    @Param('id', ParseIntPipe) id: number,
    @Param('following', ParseIntPipe) following: number,
  ) {
    return this.userService.deleteFollowing(id, following);
  }
}
