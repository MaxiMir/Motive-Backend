import {
  Get,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { DayEntity } from 'src/day/entities/day.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberEntity } from './entities/member.entity';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
@ApiTags('Members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create member' })
  @ApiResponse({ status: 201, type: MemberEntity })
  create(@Body() dto: CreateMemberDto, @Identify() clientId: number) {
    return this.memberService.create(dto, clientId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update member' })
  @ApiResponse({ status: 201, type: MemberEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMemberDto, @Identify() clientId: number) {
    return this.memberService.update(id, dto, clientId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201 })
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete member' })
  @ApiResponse({ status: 204 })
  delete(@Param('id', ParseIntPipe) id: number, @Identify() clientId: number) {
    return this.memberService.delete(id, clientId);
  }

  @Get(':id/days/:dayId')
  @ApiOperation({ summary: 'Get member day' })
  @ApiResponse({ status: 200, type: DayEntity })
  getDay(@Param('id', ParseIntPipe) id: number, @Param('dayId', ParseIntPipe) dayId: number) {
    return this.memberService.findDay(id, dayId);
  }
}
