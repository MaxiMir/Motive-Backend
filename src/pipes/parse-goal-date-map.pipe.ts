import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';

@Injectable()
export class ParseGoalDateMapPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata): GoalDayDto[] | undefined {
    if (!value) {
      return;
    }

    return value.split(',').map((v) => {
      const data = v.split(':');
      const goalID = parseInt(data[0]);
      const dayID = parseInt(data[1]);

      if (!goalID || !dayID) {
        throw new BadRequestException(`Validation failed (incorrect query ${metadata.data})`);
      }

      return { goalID, dayID };
    });
  }
}
