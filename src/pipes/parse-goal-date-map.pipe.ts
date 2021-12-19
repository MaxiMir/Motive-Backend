import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { GoalDateDto } from 'src/goal/dto/goal-date.dto';

@Injectable()
export class ParseGoalDateMapPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata): GoalDateDto[] | undefined {
    if (!value) {
      return;
    }

    return value.split(',').map((v) => {
      const data = v.split(':');
      const goalId = parseInt(data[0]);
      const dayId = parseInt(data[1]);

      if (!goalId || !dayId) {
        throw new BadRequestException(`Validation failed (incorrect query ${metadata.data})`);
      }

      return { goalId, dayId };
    });
  }
}
