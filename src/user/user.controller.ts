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
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFile } from 'src/decorators/api-image.decorator';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ParseFile } from 'src/pipes/parse-file.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find users' })
  @ApiPagination({ name: 'where[email]', example: 'mmirrev@gmail.com' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  find(@Query() query: FindQueryDto) {
    return this.userService.find(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserEntity })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto, @Identify() clientId: number) {
    return this.userService.update(dto, clientId);
  }

  @Patch(':id/avatar')
  @UseGuards(AuthGuard)
  @ApiImageFile('avatar')
  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({ status: 200, type: UserEntity })
  updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @Identify() clientId: number,
  ) {
    return this.userService.updateAvatar(file, clientId);
  }

  @Delete(':id/avatar')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user avatar' })
  @ApiResponse({ status: 204 })
  deleteAvatar(@Param('id', ParseIntPipe) id: number, @Identify() clientId: number) {
    return this.userService.deleteAvatar(clientId);
  }
}
