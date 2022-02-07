import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/abstracts/pagination';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';
import { Goal } from 'src/goal/goal.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { DayService } from 'src/day/day.service';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class PageService {
  constructor(
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly subscriptionService: SubscriptionService,
    private readonly reactionService: ReactionService,
  ) {}

  async findUser(nickname: string, goalDatesMap?: GoalDayDto[]) {
    // TODO временно
    const client = await this.userService.findByNickname('maximir');
    const user = await this.userService.findByNickname(nickname, {
      relations: ['characteristic', 'goals', 'member'],
    });
    const reactionsList = await this.findReactionsList(user.goals, client);
    const following = await this.subscriptionService.checkOnFollowing(user.id, client.id);
    const goals = await this.findGoals(user.goals, reactionsList, goalDatesMap);
    const goalsMember = await this.findGoals(user.member, reactionsList, goalDatesMap);

    return {
      client,
      content: {
        id: user.id,
        nickname: user.nickname,
        name: user.name,
        avatar: user.avatar,
        characteristic: user.characteristic,
        following,
        goals,
        goalsMember,
      },
    };
  }

  async findGoals(
    goals: Goal[],
    reactionsList: Record<string, { motivation: number; creativity: number }>,
    goalDatesMap?: GoalDayDto[],
  ) {
    const goalsWithDay = await Promise.all(
      goals.map(async (goal) => {
        const { dayId } = goalDatesMap?.find(({ goalId }) => goalId === goal.id) || {};
        const day = dayId
          ? await this.dayService.findByPK(dayId)
          : await this.dayService.findLastAdd({ goal: goal.id });

        const tasks = day.tasks.sort((a, b) => a.id - b.id);
        const calendar = await this.goalService.findDates(goal.id);
        const reactions = reactionsList[goal.id] || { motivation: [], creativity: [] };

        return { ...goal, calendar, reactions, day: { ...day, tasks } };
      }),
    );

    return goalsWithDay.sort((a, b) => a.id - b.id);
  }

  async findReactionsList(goals, user?: User) {
    const ids = user && goals.filter((g) => g.owner.id !== user.id).map((g) => g.id);

    if (!ids?.length) {
      return {};
    }

    const reactions = await this.reactionService
      .getRepository()
      .createQueryBuilder('reaction')
      .leftJoin('reaction.day', 'day')
      .leftJoin('day.goal', 'goal')
      .addSelect(['goal.id', 'day.id', 'characteristic'])
      .where('goal.id IN (:...ids)', { ids })
      .getMany();

    return reactions.reduce((acc, { characteristic, day }) => {
      if (!acc[day.goal.id]) {
        acc[day.goal.id] = {
          motivation: [],
          creativity: [],
        };
      }

      acc[day.goal.id][characteristic].push(day.id);

      return acc;
    }, {});
  }

  async findFollowing(id: number, pagination: Pagination) {
    // TODO временно
    const client = await this.userService.findByPK(id);
    const following = await this.subscriptionService.findFollowing(id, pagination);

    return { client, content: following };
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

  async findRating(id: number) {
    // TODO временно
    const client = await this.userService.findByPK(id);
    const motivation = await this.findRatingByCharacteristic('motivation', 100);
    const creativity = await this.findRatingByCharacteristic('creativity', 100);
    const support = await this.findRatingByCharacteristic('support', 100);

    return {
      client,
      content: {
        motivation,
        creativity,
        support,
      },
    };
  }
}
