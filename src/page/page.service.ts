import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/abstracts/pagination';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';
import { Goal } from 'src/goal/entities/goal.entity';
import { UserService } from 'src/user/user.service';
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

  async findUser(nickname: string, goalDatesMap?: GoalDayDto[], userId?: number) {
    const user = await this.userService
      .getRepository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.characteristic', 'characteristic')
      .leftJoinAndSelect('user.goals', 'goals')
      .leftJoinAndSelect('goals.characteristic', 'goals-characteristic')
      .leftJoinAndSelect('goals.owner', 'owner')
      .leftJoinAndSelect('user.member', 'member')
      .leftJoinAndSelect('member.characteristic', 'member-characteristic')
      .leftJoinAndSelect('member.owner', 'member-owner')
      .where('user.nickname = :nickname', { nickname })
      .andWhere('goals.confirmation IS NULL')
      .getOneOrFail();
    const following = !userId ? false : await this.subscriptionService.checkOnFollowing(user.id, userId);
    const ownerGoals = await this.findGoals(user.goals, userId, goalDatesMap, false);
    const memberGoals = await this.findGoals(user.member, userId, goalDatesMap, true);
    const goals = [...ownerGoals, ...memberGoals];

    return {
      content: {
        id: user.id,
        nickname: user.nickname,
        name: user.name,
        avatar: user.avatar,
        characteristic: user.characteristic,
        following,
        goals,
      },
    };
  }

  private async findGoals(goals: Goal[], userId, goalDatesMap: GoalDayDto[] | undefined, member: boolean) {
    const relations = ['tasks', 'feedback'];
    const reactionsList = await this.findReactionsList(goals, userId);

    return Promise.all(
      goals.map(async (goal) => {
        const { dayId } = goalDatesMap?.find(({ goalId }) => goalId === goal.id) || {};
        const day = dayId
          ? await this.dayService.findByPK(dayId, { relations })
          : await this.dayService.findOne({
              relations,
              where: { goal: goal.id },
              order: {
                id: 'DESC',
              },
            });
        const calendar = await this.goalService.findCalendar(goal.id);
        const reactions = reactionsList[goal.id] || { motivation: [], creativity: [] };

        return { ...goal, day, calendar, reactions, member };
      }),
    );
  }

  private async findReactionsList(goals, userId?: number) {
    const ids = !userId ? [] : goals.filter((g) => g.owner.id !== userId).map((g) => g.id);

    if (!ids.length) {
      return {};
    }

    const reactions = await this.reactionService
      .getRepository()
      .createQueryBuilder('reaction')
      .select(['reaction.goal.id as goal_id', 'reaction.day.id as day_id', 'characteristic'])
      .where('reaction.goal.id IN (:...ids)', { ids })
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

  async findFollowing(pagination: Pagination, userId?: number) {
    const following = !userId ? [] : await this.subscriptionService.findFollowing(userId, pagination);

    return { content: following };
  }

  async findRating() {
    const motivation = await this.findByCharacteristic('motivation', 100);
    const creativity = await this.findByCharacteristic('creativity', 100);
    const support = await this.findByCharacteristic('support', 100);

    return {
      content: {
        motivation,
        creativity,
        support,
      },
    };
  }

  private findByCharacteristic(characteristic: string, take: number) {
    return this.userService
      .getRepository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.characteristic', 'characteristic')
      .orderBy(`characteristic.${characteristic}`, 'DESC')
      .take(take)
      .getMany();
  }
}
