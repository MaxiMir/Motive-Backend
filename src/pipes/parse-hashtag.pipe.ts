import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { CreateGoalDto } from 'src/goal/dto/create-goal.dto';

@Injectable()
export class ParseHashtagPipe implements PipeTransform {
  transform(value: CreateGoalDto, metadata: ArgumentMetadata): CreateGoalDto {
    try {
      return {
        ...value,
        hashtags: value.hashtags.map((h) => h.toLowerCase().replace(/[^a-z\d]/g, '')),
      };
    } catch {
      throw new BadRequestException(`Validation failed (incorrect query ${metadata.data})`);
    }
  }
}
