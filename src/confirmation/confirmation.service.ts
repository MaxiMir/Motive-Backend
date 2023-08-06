import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { MemberService } from 'src/member/member.service';
import { GoalService } from 'src/goal/goal.service';
import { FileService } from 'src/file/file.service';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { ConfirmationEntity } from './entities/confirmation.entity';

@Injectable()
export class ConfirmationService {
  constructor(
    @InjectRepository(ConfirmationEntity)
    private readonly confirmationRepository: Repository<ConfirmationEntity>,
    private readonly userService: UserService,
    private readonly memberService: MemberService,
    private readonly goalService: GoalService,
    private readonly fileService: FileService,
  ) {}

  async save(dto: CreateConfirmationDto, photos: Express.Multer.File[], userId: number) {
    const user = await this.userService.findByPK(userId, { relations: ['characteristic'] });
    const goal = await this.goalService.findByPK(dto.goalId, { relations: ['owner'] });
    const member =
      goal.ownerId === userId
        ? null
        : await this.memberService.findOne({ where: { user: user.id, goal: goal.id } });
    const confirmation = new ConfirmationEntity();
    confirmation.started = member?.started || goal.started;
    confirmation.end = dto.end;
    confirmation.photos = await this.fileService.uploadAndMeasureImages(photos, 'confirmation');
    confirmation.goal = goal;
    confirmation.user = user;
    confirmation.member = !!member;

    if (!member) {
      confirmation.goal.completed = true;
    }

    if (dto.text) {
      confirmation.text = dto.text;
    }

    user.characteristic.points += !member ? goal.points : member.completedTasks.length;
    user.characteristic.completed += 1;

    return this.confirmationRepository.manager.transaction(async (transactionalManager) => {
      if (member) {
        await transactionalManager.remove(member);
      }

      await transactionalManager.save(user);

      return transactionalManager.save(confirmation);
    });
  }

  async find(query: FindQueryDto) {
    const { where, take, skip } = query;

    return this.confirmationRepository.find({
      relations: ['goal', 'goal.owner'],
      where,
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });
  }
}
