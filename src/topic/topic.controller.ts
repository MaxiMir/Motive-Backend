import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('topic')
@ApiTags('Topics')
export class TopicController {}
