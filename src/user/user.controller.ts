import {
  Controller,
  UploadedFile,
  Body,
  Param,
  Get,
  Post,
  Patch,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindQuery } from './dto/find-query.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find users' })
  @ApiPagination({ name: 'where[email]', example: 'mmirrev@gmail.com' })
  @ApiResponse({ status: 200, type: [User] })
  find(@Query() query: FindQuery) {
    return this.userService.find(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
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
  @ApiResponse({ status: 200, type: User })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @Identify() clientId: number,
  ) {
    return this.userService.update(dto, file, clientId);
  }

  @Get(':nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiResponse({ status: 200, type: UserDto })
  findByNickname(@Param('nickname') nickname: string) {
    return this.userService.findByNickname(nickname);
  }
}
