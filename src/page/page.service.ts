import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { PaginationDto } from 'src/common/pagination.dto';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { MemberEntity } from 'src/member/entities/member.entity';
import { UserService } from 'src/user/user.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { DayPointService } from 'src/day-point/day-point.service';
import { DayService } from 'src/day/day.service';
import { GoalService } from 'src/goal/goal.service';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { MemberService } from 'src/member/member.service';
import { ArticleService } from 'src/article/article.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { LocaleDto } from 'src/common/locale.dto';

type PointsMap = Record<number, number[]>;

@Injectable()
export class PageService {
  constructor(
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
    private readonly subscriptionService: SubscriptionService,
    private readonly dayPointService: DayPointService,
    private readonly memberService: MemberService,
    private readonly hashtagService: HashtagService,
    private readonly articleService: ArticleService,
  ) {}

  async findUser(nickname: string, clientId?: number, queryDayMap: GoalDayDto[] = []) {
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
      .leftJoinAndSelect('goals.owner', 'owner')
      .leftJoinAndSelect('user.membership', 'membership')
      .leftJoinAndSelect('membership.goal', 'membership-goal')
      .leftJoinAndSelect('membership-goal.owner', 'membership-goal-owner')
      .leftJoinAndSelect('user.confirmations', 'confirmations')
      .orderBy('confirmations.id', 'DESC')
      .leftJoinAndSelect('confirmations.goal', 'confirmation-goal')
      .leftJoinAndSelect('confirmation-goal.owner', 'confirmation-goal-owner')
      .where('user.nickname = :nickname', { nickname })
      .getOneOrFail();
    const following = !clientId ? false : await this.subscriptionService.checkOnFollowing(user.id, clientId);
    const memberGoals = await this.findClientMemberGoals(membership);
    const pointsMap = await this.findPointsMap([...user.goals, ...memberGoals], clientId);
    const ownerGoalsWithDay = await this.findDays(user.goals, pointsMap, queryDayMap);
    const memberGoalsWithDay = await this.findDays(memberGoals, pointsMap, queryDayMap, membership);
    const goals = await this.findLastMembers([...ownerGoalsWithDay, ...memberGoalsWithDay]);

    return {
      ...user,
      following,
      goals,
    };
  }

  async findFollowing(pagination: PaginationDto, userId?: number) {
    const following = !userId ? [] : await this.subscriptionService.findFollowing(userId, pagination);

    return { following };
  }

  findRating() {
    return this.findByProgress(100);
  }

  async findSearch(params: SearchQueryDto) {
    const { q = '', type } = params;
    const users = await this.findByProgress(8);
    const goal = []; // await this.goalService.findByPK(1, { relations: ['owner'] });
    // const hashtags = await this.hashtagService.find({ take: 12, order: { views: 'DESC' } });

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
    const localize = this.articleService.toLocalize(locale);

    return {
      articles: articles.map(localize),
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
    const localize = this.articleService.toLocalize(locale);
    const article = localize(foundArticle);
    const articles = await repository
      .createQueryBuilder('article')
      .select(fields)
      .take(3)
      .where({ id: Not(article.id) })
      .getMany();
    const more = articles.map(localize);
    foundArticle.sharesCount += !share ? 0 : 1;
    foundArticle.views++;

    await repository.save(foundArticle);

    return { ...article, more };
  }

  private async findDays(
    goals: GoalEntity[],
    pointsMap: PointsMap,
    queryDayMap: GoalDayDto[],
    membership?: MemberEntity[],
  ) {
    const relations = ['tasks', 'feedback'];
    const dayMap = !membership ? queryDayMap : this.getMemberDayMap(membership, queryDayMap);

    return Promise.all(
      goals.map(async (goal) => {
        const member = membership?.find((m) => m.goalId === goal.id);
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
        const viewerPoints = pointsMap[goal.id] || [];

        return { ...goal, day, calendar, viewerPoints, member };
      }),
    );
  }

  private findByProgress(take: number) {
    return this.userService
      .getRepository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.characteristic', 'characteristic')
      .orderBy('characteristic.progress', 'DESC')
      .take(take)
      .getMany();
  }

  private getMemberDayMap(membership: MemberEntity[], queryDayMap: GoalDayDto[]) {
    return membership.reduce((acc, { goalId, dayId }) => {
      const goalIdExist = acc.some((d) => d.goalId === goalId);

      return goalIdExist ? acc : [...acc, { goalId, dayId }];
    }, queryDayMap);
  }

  private async findPointsMap(goals: GoalEntity[], userId?: number): Promise<PointsMap> {
    const ids = !userId ? [] : goals.filter((g) => g.owner.id !== userId).map((g) => g.id);

    if (!ids.length) {
      return {};
    }

    const likedDays = await this.dayPointService
      .getRepository()
      .createQueryBuilder('day-point')
      .select(['day-point.goal.id as goal_id', 'day-point.day.id as day_id'])
      .where('day-point.goal.id in (:...ids)', { ids })
      .andWhere('day-point.user.id = :userId', { userId })
      .getRawMany();

    return likedDays.reduce(
      (acc, { goal_id, day_id }) => ({ ...acc, [goal_id]: [...(acc[goal_id] || []), day_id] }),
      {},
    );
  }

  private async findClientMemberGoals(membership: MemberEntity[], clientId?: number) {
    const client = !clientId
      ? null
      : await this.userService.findByPK(clientId, { relations: ['membership'] });

    return membership.map(({ goal }) => ({
      ...goal,
      member: client?.membership?.find((m) => m.goalId === goal.id),
    }));
  }

  private async findLastMembers(goals: GoalEntity[]) {
    const maxCount = 3;
    const ids = goals.map((g) => g.id);

    if (!ids.length) {
      return goals;
    }

    const members = await this.memberService
      .getRepository()
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.user', 'user')
      .select([
        'members.goal.id as goal',
        'user.id as id',
        'user.name as name',
        'user.nickname as nickname',
        'user.avatar as avatar',
      ])
      .where('members.goal.id in (:...ids)', { ids })
      .limit(ids.length * maxCount)
      .orderBy('members.id', 'DESC')
      .getRawMany();

    return goals.map((goal) => ({
      ...goal,
      lastMembers: members.filter((m) => m.goal === goal.id).slice(0, maxCount),
    }));
  }
}
