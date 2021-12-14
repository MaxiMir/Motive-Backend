import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class PageService {
  constructor(
    private userService: UserService,
    private goalService: GoalService,
  ) {}

  async findUserPage(nickname: string, goalsMap: [number, number][]) {
    const user = await this.userService.findOne({ nickname });

    if (!user) {
      return null;
    }

    const characteristic = await user.characteristic;
    const preferences = await user.preferences;

    return { ...user, characteristic, preferences };
  }
}
