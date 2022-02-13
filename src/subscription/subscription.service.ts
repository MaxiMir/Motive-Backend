import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/abstracts/pagination';
import { Operation } from 'src/abstracts/operation';
import { UserService } from 'src/user/user.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly userService: UserService,
  ) {}

  async checkOnFollowing(userID: number, followerID: number) {
    const result = await this.subscriptionRepository.findOne({
      select: ['id'],
      where: {
        user: userID,
        follower: followerID,
      },
    });

    return !!result;
  }

  async findFollowing(userID: number, pagination: Pagination) {
    const result = await this.subscriptionRepository.find({
      where: { follower: userID },
      relations: ['user', 'user.characteristic'],
      order: {
        id: 'DESC',
      },
      ...pagination,
    });

    return result.map((item) => item.user);
  }

  async findFollowers(userID: number, pagination: Pagination) {
    const result = await this.subscriptionRepository.find({
      where: { user: userID },
      relations: ['follower', 'follower.characteristic'],
      order: {
        id: 'DESC',
      },
      ...pagination,
    });

    return result.map((item) => item.follower);
  }

  async update(id: number, dto: UpdateSubscriptionDto, operation: Operation) {
    const user = await this.userService.findByPK(id);
    const following = await this.userService.findByPK(dto.id, { relations: ['characteristic'] });

    return this.subscriptionRepository.manager.transaction(async (transactionalManager) => {
      // todo fix:
      await this.subscriptionRepository[operation]({ user: following, follower: user });
      following.characteristic.followers += operation === 'insert' ? 1 : -1;

      await transactionalManager.save(following);
    });
  }
}
