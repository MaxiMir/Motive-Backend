import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';

@Injectable()
export class PageService {
  constructor(private readonly userService: UserService, private readonly dayService: DayService) {}

  async findUser(nickname: string, goalDatesMap) {
    const user = await this.userService.findByNickname(nickname, {
      relations: ['characteristic', 'favorites', 'goals', 'member'],
    });
    const goals = await Promise.all(
      user.goals.map(async (goal) => {
        const { dayId } = goalDatesMap?.find(({ goalId }) => goalId === goal.id) || {};
        const day = dayId
          ? await this.dayService.findByPK(dayId)
          : await this.dayService.findLastAdd({ goal: goal.id });

        return { ...goal, day };
      }),
    );

    return { content: { ...user, goals } };
  }

  async findFavorites() {
    // TODO временно
    const { favorites } = await this.userService.findByNickname('maximir', {
      relations: ['favorites', 'favorites.characteristic'],
    });

    return { content: favorites };
  }
}
