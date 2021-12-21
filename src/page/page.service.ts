import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';

@Injectable()
export class PageService {
  constructor(private readonly userService: UserService, private readonly dayService: DayService) {}

  async findUser(nickname: string, goalDatesMap) {
    // TODO временно
    const client = await this.userService.findByNickname('maximir', { relations: ['following'] });

    const user = await this.userService.findByNickname(nickname, {
      relations: ['characteristic', 'goals', 'member'],
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

    return {
      content: {
        favorite: client?.following.some((f) => f.id === user.id),
        user: { ...user, goals },
      },
    };
  }

  async findFollowers(nickname: string) {
    // todo
    return { content: [] };
  }

  async findFollowing(id: number) {
    const { following } = await this.userService.findByPK(id, {
      relations: ['following', 'following.characteristic'],
    });

    return { content: following };
  }
}
