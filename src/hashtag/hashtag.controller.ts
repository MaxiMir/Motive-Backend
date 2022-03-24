import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('hashtags')
@ApiTags('Hashtags')
export class HashtagController {}
