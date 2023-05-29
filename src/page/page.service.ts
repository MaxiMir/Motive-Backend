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
import { MemberService } from 'src/member/member.service';
import { ArticleService } from 'src/article/article.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { LocaleDto } from 'src/locale/dto/locale.dto';
import { Not } from 'typeorm';

type ReactionsMap = Record<number, { [k in CharacteristicDto]: number[] }>;

@Injectable()
export class PageService {
  constructor(
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly subscriptionService: SubscriptionService,
    private readonly reactionService: ReactionService,
    private readonly memberService: MemberService,
    private readonly hashtagService: HashtagService,
    private readonly articleService: ArticleService,
  ) {}

  async findUser(nickname: string, clientId?: number, queryDayMap: GoalDayDto[] = []) {
    const client = !clientId
      ? null
      : await this.userService.findByPK(clientId, { relations: ['membership'] });
    const { membership, ...user } = await this.userService
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
    const following = !clientId ? false : await this.subscriptionService.checkOnFollowing(user.id, clientId);
    const memberGoals = membership.map((m) => m.goal);
    const reactionsMap = await this.findReactionsMap([...user.goals, ...memberGoals], clientId);
    const ownerGoalsWithDay = await this.findDays(user.goals, reactionsMap, queryDayMap);
    const memberGoalsWithDay = await this.findDays(memberGoals, reactionsMap, queryDayMap, membership);
    const goals = [...ownerGoalsWithDay, ...memberGoalsWithDay];

    return {
      ...user,
      following,
      goals,
      confirmations: user.confirmations,
      clientMembership: client?.membership || [],
    };
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

  async findSearch(params: SearchQueryDto) {
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

  async findBlog(locale: LocaleDto) {
    const fields = this.articleService.getFields(locale);
    const articles = await this.articleService
      .getRepository()
      .createQueryBuilder('article')
      .select(fields)
      .orderBy('article.id', 'DESC')
      .getMany();
    const spreadLocale = this.articleService.getSpreadLocale(locale);

    return {
      articles: articles.map(spreadLocale),
    };
  }

  async findArticle(pathname: string, locale: LocaleDto, share?: string) {
    const fields = this.articleService.getFields(locale);
    const repository = this.articleService.getRepository();
    const foundArticle = await repository
      .createQueryBuilder('article')
      .select(fields)
      .where('article.pathname = :pathname', { pathname })
      .getOneOrFail();
    const spreadLocale = this.articleService.getSpreadLocale(locale);
    const article = spreadLocale(foundArticle);
    const articles = await repository
      .createQueryBuilder('article')
      .select(fields)
      .take(3)
      .where({ id: Not(article.id) })
      .getMany();
    const more = articles.map(spreadLocale);
    foundArticle.sharesCount += !share ? 0 : 1;
    foundArticle.views++;

    await repository.save(foundArticle);

    return { ...article, more };
  }

  private async findDays(
    goals: GoalEntity[],
    reactionsMap: ReactionsMap,
    queryDayMap: GoalDayDto[],
    membership?: MemberEntity[],
  ) {
    const relations = ['characteristic', 'tasks', 'feedback'];
    const dayMap = !membership ? queryDayMap : this.getMemberGoalDayMap(membership, queryDayMap);

    return Promise.all(
      goals.map(async (goal) => {
        const member = membership?.find((m) => m.goalId === goal.id);
        const reactions = reactionsMap[goal.id] || { motivation: [], creativity: [] };
        const { dayId } = dayMap.find(({ goalId }) => goalId === goal.id) || {};
        const foundDay = dayId
          ? await this.dayService.findByPK(dayId, { relations })
          : await this.dayService.findOne({
              relations,
              where: { goal: goal.id },
              order: {
                id: 'DESC',
              },
            });
        const calendar = await this.goalService.findCalendar(goal.id);
        const day = !member ? foundDay : this.memberService.transformToMemberDay(foundDay, member);

        return { ...goal, day, calendar, reactions, member };
      }),
    );
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

  private getMemberGoalDayMap(membership: MemberEntity[], queryDayMap: GoalDayDto[]) {
    return membership.reduce((acc, { goalId, dayId }) => {
      const goalIdExist = acc.some((d) => d.goalId === goalId);

      return goalIdExist ? acc : [...acc, { goalId, dayId }];
    }, queryDayMap);
  }

  private async findReactionsMap(goals, userId?: number): Promise<ReactionsMap> {
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
}
