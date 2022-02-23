import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { Characteristic } from 'src/abstracts/characteristic';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { Reaction } from 'src/reaction/entities/reaction.entity';
import { Confirmation } from 'src/confirmation/entities/confirmation.entity';
import { UserService } from 'src/user/user.service';
import { ExperienceService } from 'src/experience/experience.service';
import { FileService } from 'src/file/file.service';
import { DayService } from 'src/day/day.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { UpdateCompletedDto } from './dto/update-completed.dto';
import { Goal } from './entities/goal.entity';
import { FindQuery } from './dto/find-query';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
    private readonly fileService: FileService,
  ) {}

  async save(userId: number, dto: CreateGoalDto) {
    const { name, hashtags, tasks } = dto;
    const goal = new Goal();
    const day = this.dayService.create({ tasks });
    goal.name = name;
    goal.characteristic = new GoalCharacteristic();
    goal.hashtags = hashtags;
    goal.stages = dto.stages;
    goal.days = [day];
    goal.owner = await this.userService.findByPK(userId);

    return this.goalRepository.save(goal);
  }

  findByPK(id: number, options?: FindOneOptions<Goal>) {
    return this.goalRepository.findOneOrFail({ id }, options);
  }

  async find(query: FindQuery) {
    const { where, take, skip } = query;

    return this.goalRepository.find({
      relations: ['characteristic', 'owner', 'confirmation'],
      where,
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });
  }

  findCalendar(id: number) {
    return this.dayService
      .getRepository()
      .createQueryBuilder('day')
      .select(['day.id as id', 'day.date as date'])
      .where('day.goal.id = :id', { id })
      .orderBy('day.id', 'ASC')
      .getRawMany();
  }

  async addDay(userId: number, id: number, dto: CreateDayDto) {
    const goal = await this.findByPK(id, { relations: ['days'] });
    const day = this.dayService.create(dto);
    day.stage = goal.stage;
    goal.days.push(day);

    return this.goalRepository.save(goal);
  }

  async updateStage(userId: number, id: number, dto: UpdateStageDto) {
    return this.goalRepository.update({ id }, { stage: dto.stage });
  }

  async updateConfirmation(
    userId: number,
    id: number,
    dto: UpdateCompletedDto,
    photos: Express.Multer.File[],
  ) {
    const owner = await this.userService.findByPK(userId, { relations: ['characteristic'] });
    const goal = await this.findByPK(id, { relations: ['characteristic'] });
    goal.confirmation = new Confirmation();
    goal.confirmation.photos = await this.fileService.uploadAndMeasureImages(photos, 'confirmation');

    if (dto.text) {
      goal.confirmation.text = dto.text;
    }

    if (goal.characteristic.creativity) {
      owner.characteristic.creativity_all += goal.characteristic.creativity;
      owner.characteristic.creativity = ExperienceService.getProgress(owner.characteristic.creativity_all);
    }

    if (goal.characteristic.support) {
      owner.characteristic.support_all += goal.characteristic.support;
      owner.characteristic.support = ExperienceService.getProgress(owner.characteristic.support_all);
    }

    owner.characteristic.completed += 1;
    owner.characteristic.motivation_all += goal.characteristic.motivation + ExperienceService.EXTRA_POINTS;
    owner.characteristic.motivation = ExperienceService.getProgress(owner.characteristic.motivation_all);

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.save(goal);
      await transactionalManager.save(owner);
    });
  }

  async updateCharacteristic(
    userId: number,
    id: number,
    dayId: number,
    characteristic: Characteristic,
    operation: Operation,
  ) {
    const user = await this.userService.findByPK(userId);
    const goal = await this.findByPK(id, { relations: ['characteristic'] });
    const day = await this.dayService.findByPK(dayId, { relations: ['characteristic'] });
    const uniq = this.getUniq(user.id, day.id, characteristic);

    if (!day.characteristic) {
      day.characteristic = new DayCharacteristic();
      day.characteristic[characteristic] = 0;
    }

    day.characteristic[characteristic] += operation === 'insert' ? 1 : -1;
    goal.characteristic[characteristic] += operation === 'insert' ? 1 : -1;

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](Reaction, { user, characteristic, goal, day, uniq });
      await transactionalManager.save(day);
      await transactionalManager.save(goal);
    });
  }

  getUniq(userId: number, dayId: number, characteristic: Characteristic) {
    return [userId, dayId, characteristic].join(':');
  }
}
