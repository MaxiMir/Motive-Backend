import { Injectable } from '@nestjs/common';
import { Operation } from 'src/abstracts/operation';
import { UserService } from 'src/user/user.service';
import { UpdateFollowingDto } from './dto/update-following.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly userService: UserService) {}

  async updateFollowing(id: number, dto: UpdateFollowingDto, operation: Operation) {
    const repository = this.userService.getRepository();
    const user = await this.userService.findByPK(id, { relations: ['subscription'] });
    const following = await this.userService.findByPK(dto.id, {
      relations: ['subscription', 'characteristic'],
    });

    switch (operation) {
      case 'add':
        user.subscription.following.push(dto.id);
        following.subscription.followers.push(user.id);
        following.characteristic.followers += 1;
        break;
      case 'remove':
        user.subscription.following = user.subscription.following.filter((f) => f !== dto.id);
        following.subscription.followers = user.subscription.followers.filter((f) => f !== user.id);
        following.characteristic.followers -= 1;
        break;
    }

    await repository.save(following);
    await repository.save(user);
  }
}
