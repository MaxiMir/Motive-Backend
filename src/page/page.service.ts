import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';

@Injectable()
export class PageService {
  constructor(private readonly userService: UserService, private readonly dayService: DayService) {}

  async findUser(nickname: string, goalDatesMap) {
    // TODO временно
    const client = await this.userService.findByNickname('maximir', { relations: ['subscription'] });

    const user = await this.userService.findByNickname(nickname, {
      relations: ['characteristic', 'goals', 'member', 'subscription'],
    });
    const favorite = client?.subscription.following.includes(user.id);

    const goals = await Promise.all(
      user.goals.map(async (goal) => {
        const { dayId } = goalDatesMap?.find(({ goalId }) => goalId === goal.id) || {};
        const day = dayId
          ? await this.dayService.findByPK(dayId)
          : await this.dayService.findLastAdd({ goal: goal.id });

        return { ...goal, days: [day] };
      }),
    );
    // todo member goals
    return {
      client,
      content: {
        favorite,
        user: { ...user, goals },
      },
    };
  }

  async findSubscription(id: number, type: 'following' | 'followers') {
    const user = await this.userService.findByPK(id, {
      relations: ['subscription'],
    });

    if (!user.subscription[type].length) {
      return [];
    }

    return await this.userService.findAll({
      where: {
        id: In(user.subscription[type]),
      },
      relations: ['characteristic'],
    });
  }

  async findFollowers(id: number) {
    const followers = await this.findSubscription(id, 'followers');

    return { content: followers };
  }

  async findFollowing(id: number) {
    const following = await this.findSubscription(id, 'following');

    return { content: following };
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
