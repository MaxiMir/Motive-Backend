import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { FileService } from 'src/file/file.service';
import { ExpService } from 'src/exp/exp.service';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { FindQuery } from './dto/find-query';
import { Confirmation } from './entities/confirmation.entity';

@Injectable()
export class ConfirmationService {
  constructor(
    @InjectRepository(Confirmation)
    private readonly confirmationRepository: Repository<Confirmation>,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly fileService: FileService,
    private readonly expService: ExpService,
  ) {}

  async save(dto: CreateConfirmationDto, photos: Express.Multer.File[], userId: number) {
    const user = await this.userService.findByPK(userId, { relations: ['characteristic'] });
    const goal = await this.goalService.findByPK(dto.goalId, { relations: ['characteristic'] });
    const isOwner = goal.ownerId === userId;
    const confirmation = new Confirmation();
    confirmation.started = goal.started; // todo member
    confirmation.end = dto.end;
    confirmation.photos = await this.fileService.uploadAndMeasureImages(photos, 'confirmation');
    confirmation.goal = goal;
    confirmation.user = user;
    confirmation.owner = user; // todo member

    if (dto.text) {
      confirmation.text = dto.text;
    }

    if (isOwner && goal.characteristic.creativity) {
      user.characteristic.creativity_all += goal.characteristic.creativity;
      user.characteristic.creativity = this.expService.getProgress(user.characteristic.creativity_all);
    }

    if (isOwner && goal.characteristic.support) {
      user.characteristic.support_all += goal.characteristic.support;
      user.characteristic.support = this.expService.getProgress(user.characteristic.support_all);
    }

    if (isOwner && goal.characteristic.motivation) {
      user.characteristic.motivation_all += goal.characteristic.motivation;
    }

    user.characteristic.completed += 1;
    user.characteristic.motivation_all += ExpService.EXTRA_POINTS;
    user.characteristic.motivation = this.expService.getProgress(user.characteristic.motivation_all);

    return this.confirmationRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.save(user);

      return transactionalManager.save(confirmation);
    });
  }

  async find(query: FindQuery) {
    const { where, take, skip } = query;

    return this.confirmationRepository.find({
      relations: ['goal', 'goal.characteristic', 'owner'],
      where,
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });
  }
}
