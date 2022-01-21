import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from 'src/abstracts/operation';
import { UserService } from 'src/user/user.service';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
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

  async findFollowing(userId: number, take: number, skip: number) {
    const result = await this.subscriptionRepository.find({
      where: { follower: userId },
      relations: ['user', 'user.characteristic'],
      order: {
        id: 'DESC',
      },
      skip,
      take,
    });

    return result.map((item) => item.user); // TODO use inner join ?
  }

  async findFollowers(userId: number, take: number, skip: number) {
    const result = await this.subscriptionRepository.find({
      where: { user: userId },
      relations: ['follower', 'follower.characteristic'],
      order: {
        id: 'DESC',
      },
      skip,
      take,
    });

    return result.map((item) => item.follower);
  }

  async updateFollowing(id: number, dto: UpdateFollowingDto, operation: Operation) {
    const userRepository = this.userService.getRepository();
    const user = await this.userService.findByPK(id);
    const following = await this.userService.findByPK(dto.id, { relations: ['characteristic'] });

    switch (operation) {
      case 'add':
        await this.subscriptionRepository.insert({ user: following, follower: user });
        following.characteristic.followers += 1;
        break;
      case 'remove':
        await this.subscriptionRepository.delete({ user: following, follower: user });
        following.characteristic.followers -= 1;
        break;
    }

    await userRepository.save(following);
  }
}
