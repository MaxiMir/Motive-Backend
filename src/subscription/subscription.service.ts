import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/pagination.dto';
import { OperationDto } from 'src/common/operation.dto';
import { UserService } from 'src/user/user.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionEntity } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    private readonly userService: UserService,
  ) {}

  async checkOnFollowing(userId: number, followerId: number) {
    const result = await this.subscriptionRepository.findOne({
      select: ['id'],
      where: {
        user: userId,
        follower: followerId,
      },
    });

    return !!result;
  }

  async findFollowing(userId: number, pagination: PaginationDto) {
    const result = await this.subscriptionRepository.find({
      where: { follower: userId },
      relations: ['user', 'user.characteristic'],
      order: {
        id: 'DESC',
      },
      ...pagination,
    });

    return result.map((item) => item.user);
  }

  async findFollowers(userId: number, pagination?: PaginationDto) {
    const result = await this.subscriptionRepository.find({
      where: { user: userId },
      relations: ['follower', 'follower.characteristic'],
      order: {
        id: 'DESC',
      },
      ...pagination,
    });

    return result.map((item) => item.follower);
  }

  async update(dto: UpdateSubscriptionDto, operation: OperationDto, userId: number) {
    const follower = await this.userService.findByPK(userId, { relations: ['characteristic'] });
    const uniq = [dto.userId, userId].join(':');
    const following = await this.userService.findByPK(dto.userId, { relations: ['characteristic'] });
    following.characteristic.followers += operation === 'insert' ? 1 : -1;
    follower.characteristic.following += operation === 'insert' ? 1 : -1;

    return this.subscriptionRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](SubscriptionEntity, { user: following, follower, uniq });
      await transactionalManager.save(following);
      await transactionalManager.save(follower);
    });
  }
}
