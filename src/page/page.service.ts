import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination.dto';
import { CharacteristicDto } from 'src/common/characteristic.dto';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { MemberEntity } from 'src/member/entities/member.entity';
import { UserService } from 'src/user/user.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { DayService } from 'src/day/day.service';
import { GoalService } from 'src/goal/goal.service';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { SearchParamsDto } from './dto/search-params.dto';

type ReactionsMap = Record<number, { [k in CharacteristicDto]: number[] }>;

@Injectable()
export class PageService {
  constructor(
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly subscriptionService: SubscriptionService,
    private readonly reactionService: ReactionService,
    private readonly hashtagService: HashtagService,
  ) {}

  async findUser(nickname: string, goalDayMap?: GoalDayDto[], userId?: number) {
    const client = !userId ? null : await this.userService.findByPK(userId, { relations: ['membership'] });
    const user = await this.userService
      .getRepository()
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.nickname',
        'user.name',
        'user.avatar',
        'user.online',
        'user.lastSeen',
        'user.device',
        'user.motto',
        'user.location',
        'user.bio',
        'user.registered',
        'user.links',
      ])
      .leftJoinAndSelect('user.characteristic', 'characteristic')
      .leftJoinAndSelect('user.goals', 'goals', 'goals."completed" = false')
      .orderBy('goals.id', 'ASC')
      .leftJoinAndSelect('goals.characteristic', 'goals-characteristic')
      .leftJoinAndSelect('goals.owner', 'owner')
      .leftJoinAndSelect('user.membership', 'membership')
      .leftJoinAndSelect('membership.goal', 'membership-goal')
      .leftJoinAndSelect('membership-goal.characteristic', 'membership-goal-characteristic')
      .leftJoinAndSelect('membership-goal.owner', 'membership-goal-owner')
      .leftJoinAndSelect('user.confirmations', 'confirmations')
      .orderBy('confirmations.id', 'DESC')
      .leftJoinAndSelect('confirmations.goal', 'confirmation-goal')
      .leftJoinAndSelect('confirmation-goal.characteristic', 'confirmation-goal-characteristic')
      .leftJoinAndSelect('confirmation-goal.owner', 'confirmation-goal-owner')
      .where('user.nickname = :nickname', { nickname })
      .getOneOrFail();
    const following = !userId ? false : await this.subscriptionService.checkOnFollowing(user.id, userId);
    const membership = this.getMembership(user.membership, goalDayMap);
    const reactionsMap = await this.findReactionsMap([...user.goals, ...membership.goals], userId);
    const ownerGoals = await this.findDays(user.goals, reactionsMap, goalDayMap);
    const memberGoals = await this.findDays(membership.goals, reactionsMap, membership.goalDayMap, true);
    const goals = [...ownerGoals, ...memberGoals];

    return {
      ...user,
      following,
      goals,
      confirmations: user.confirmations,
      clientMembership: client?.membership || [],
    };
  }

  private async findDays(
    goals: GoalEntity[],
    reactionsMap: ReactionsMap,
    goalDayMap?: GoalDayDto[],
    inherited?: boolean,
  ) {
    const relations = ['characteristic', 'tasks', 'feedback'];

    return Promise.all(
      goals.map(async (goal) => {
        const { dayId } = goalDayMap?.find(({ goalId }) => goalId === goal.id) || {};
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
        const reactions = reactionsMap[goal.id] || { motivation: [], creativity: [] };

        return { ...goal, day, calendar, reactions, inherited };
      }),
    );
  }

  private getMembership(membership: MemberEntity[], goalDayMap: GoalDayDto[] = []) {
    return membership.reduce(
      (acc, { goal, goalId, dayId }) => {
        const goalIdExist = acc.goalDayMap.some((d) => d.goalId === goalId);
        const goalDayMap = goalIdExist ? acc.goalDayMap : [...acc.goalDayMap, { goalId, dayId }];
        const goals = [...acc.goals, goal];

        return { goals, goalDayMap };
      },
      { goals: [], goalDayMap },
    );
  }

  private async findReactionsMap(goals, userId?: number) {
    const ids = !userId ? [] : goals.filter((g) => g.owner.id !== userId).map((g) => g.id);

    if (!ids.length) {
      return {};
    }

    const reactions = await this.reactionService
      .getRepository()
      .createQueryBuilder('reaction')
      .select(['reaction.goal.id as goal_id', 'reaction.day.id as day_id', 'characteristic'])
      .where('reaction.goal.id IN (:...ids)', { ids })
      .andWhere('reaction.user.id = :userId', { userId })
      .getRawMany();

    return reactions.reduce((acc, { goal_id, day_id, characteristic }) => {
      if (!acc[goal_id]) {
        acc[goal_id] = { motivation: [], creativity: [] };
      }

      acc[goal_id][characteristic].push(day_id);

      return acc;
    }, {});
  }

  async findFollowing(pagination: PaginationDto, userId?: number) {
    const following = !userId ? [] : await this.subscriptionService.findFollowing(userId, pagination);

    return { following };
  }

  async findRating() {
    const motivation = await this.findByCharacteristic('motivation', 100);
    const creativity = await this.findByCharacteristic('creativity', 100);
    const support = await this.findByCharacteristic('support', 100);

    return {
      motivation,
      creativity,
      support,
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

  async findSearch(params: SearchParamsDto) {
    const { q = '', type } = params;
    const users = await this.findByCharacteristic('motivation', 8);
    const goal = []; // await this.goalService.findByPK(1, { relations: ['characteristic', 'owner'] });
    const hashtags = await this.hashtagService.find({ take: 12, order: { views: 'DESC' } });

    return {
      q,
      type,
      hashtags: [
        { name: 'motivation', views: Math.trunc(Math.random() * 10000) },
        { name: 'develop', views: Math.trunc(Math.random() * 10000) },
        { name: 'health', views: Math.trunc(Math.random() * 10000) },
        { name: 'typescript', views: Math.trunc(Math.random() * 10000) },
        { name: 'fitness', views: Math.trunc(Math.random() * 10000) },
        { name: 'portugal', views: Math.trunc(Math.random() * 10000) },
        { name: 'slimming', views: Math.trunc(Math.random() * 10000) },
        { name: 'run', views: Math.trunc(Math.random() * 10000) },
        { name: 'backend', views: Math.trunc(Math.random() * 10000) },
        { name: 'frontend', views: Math.trunc(Math.random() * 10000) },
        { name: 'promotion', views: Math.trunc(Math.random() * 10000) },
        { name: 'english', views: Math.trunc(Math.random() * 10000) },
      ],
      goals: [goal],
      users,
    };
  }
}
