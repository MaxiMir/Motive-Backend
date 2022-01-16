import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';
import { Goal } from 'src/goal/goal.entity';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class PageService {
  constructor(
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
  ) {}

  async findGoalsWithDay(goals: Goal[], goalDatesMap?: GoalDayDto[]) {
    return await Promise.all(
      goals.map(async (goal) => {
        const { dayId } = goalDatesMap?.find(({ goalId }) => goalId === goal.id) || {};
        const day = dayId
          ? await this.dayService.findByPK(dayId)
          : await this.dayService.findLastAdd({ goal: goal.id });

        const tasks = day.tasks.sort((a, b) => a.id - b.id);
        const calendar = await this.goalService.findDates(goal.id);

        return { ...goal, calendar, days: [{ ...day, tasks }] };
      }),
    );
  }

  async findUser(nickname: string, goalDatesMap?: GoalDayDto[]) {
    // TODO временно
    const client = await this.userService.findByNickname('maximir', { relations: ['subscription'] });
    const user = await this.userService.findByNickname(nickname, {
      relations: ['characteristic', 'goals', 'member', 'subscription'],
    });
    const isFollowing = client?.subscription.following.includes(user.id);
    const goals = await this.findGoalsWithDay(user.goals, goalDatesMap);
    const goalsMember = this.findGoalsWithDay(user.member, goalDatesMap);

    return {
      client,
      content: {
        id: user.id,
        nickname: user.nickname,
        name: user.name,
        avatar: user.avatar,
        isFollowing,
        characteristic: user.characteristic,
        goals,
        goalsMember,
      },
    };
  }

  async findSubscription(userId: number, type: 'following' | 'followers') {
    const user = await this.userService.findByPK(userId, {
      relations: ['subscription'],
    });

    if (!user.subscription[type].length) {
      return [];
    }

    return await this.userService.find({
      where: {
        id: In(user.subscription[type]),
      },
      order: {
        name: 'ASC',
      },
      relations: ['characteristic'],
    });
  }

  async findFollowers(userId: number) {
    const followers = await this.findSubscription(userId, 'followers');

    return { content: followers };
  }

  async findFollowing(userId: number) {
    const following = await this.findSubscription(userId, 'following');

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
