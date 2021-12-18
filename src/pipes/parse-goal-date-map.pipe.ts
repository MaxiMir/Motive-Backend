import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { GoalDateDto } from 'src/page/dto/goal-date.dto';

@Injectable()
export class ParseGoalDateMapPipe implements PipeTransform {
  transform(value: string[] | undefined, metadata: ArgumentMetadata): GoalDateDto[] | undefined {
    try {
      if (!value) {
        return;
      }

      return value.map((v) => {
        const [goalId, dayId] = v.split(':');

        return { goalId: parseInt(goalId), dayId: parseInt(dayId) };
      });
    } catch {
      throw new BadRequestException(`Validation failed (incorrect query ${metadata.data})`);
    }
  }
}
