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
    reactionsList: Record<string, { motivation: number[]; creativity: number[] }>,
    goalDatesMap?: GoalDayDto[],
  ) {
    return Promise.all(
      goals.map(async (goal) => {
        const { dayID } = goalDatesMap?.find(({ goalID }) => goalID === goal.id) || {};
        const day = dayID
          ? await this.dayService.findByPK(dayID)
          : await this.dayService.findLastAdd({ goal: goal.id });
        const calendar = await this.goalService.findCalendar(goal.id);
        const reactions = reactionsList[goal.id] || { motivation: [], creativity: [] };

        return { ...goal, calendar, reactions, day };
      }),
    );
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
      .select(['goal.id', 'day.id', 'characteristic'])
      .where('goal.id IN (:...ids)', { ids })
      .getRawMany();

    return reactions.reduce((acc, { goal_id, day_id, characteristic }) => {
      if (!acc[goal_id]) {
        acc[goal_id] = {
          motivation: [],
          creativity: [],
        };
      }

      acc[goal_id][characteristic].push(day_id);

      return acc;
    }, {});
  }

  async findFollowing(id: number, pagination: Pagination) {
    // TODO временно
    const client = await this.userService.findByPK(id);
    const following = await this.subscriptionService.findFollowing(id, pagination);

    return { client, content: following };
  }

  async findByCharacteristic(characteristic: string, take: number) {
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
    const motivation = await this.findByCharacteristic('motivation', 100);
    const creativity = await this.findByCharacteristic('creativity', 100);
    const support = await this.findByCharacteristic('support', 100);

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
