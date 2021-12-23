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

    // todo member goals
    const goals = await Promise.all(
      user.goals.map(async (goal) => {
        const { dayId } = goalDatesMap?.find(({ goalId }) => goalId === goal.id) || {};
        const day = dayId
          ? await this.dayService.findByPK(dayId)
          : await this.dayService.findLastAdd({ goal: goal.id });

        return { ...goal, days: [day] };
      }),
    );

    return {
      client,
      content: {
        favorite: client?.following.some((f) => f.id === user.id),
        user: { ...user, goals },
      },
    };
  }

  async findFollowers(nickname: string) {
    const { id } = await this.userService.findByNickname(nickname);
    const content = await this.userService
      .getRepository()
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.following', 'following')
      .where('following.followingId = :id', { id })
      .getMany();

    return { content };
  }

  async findFollowing(id: number) {
    const users = await this.userService.findByPK(id, {
      relations: ['following', 'following.characteristic'],
    });

    return { content: users.following };
  }

  async findRatingByCharacteristic(characteristic: string, take: number) {
    return await this.userService
      .getRepository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.characteristic', 'characteristic')
      .orderBy(`characteristic.${characteristic}`, 'DESC')
      .take(take)
      .getMany();
  }

  async findRating() {
    const motivation = await this.findRatingByCharacteristic('motivation', 100);
    const creativity = await this.findRatingByCharacteristic('creativity', 100);
    const support = await this.findRatingByCharacteristic('support', 100);

    return {
      content: {
        motivation,
        creativity,
        support,
      },
    };
  }
}
