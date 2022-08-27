import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Raw, Repository } from 'typeorm';
import { FindQueryDto } from './dto/find-query.dto';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  @Cron('00 15 01 * * *')
  async handleOutdated() {
    await this.notificationRepository.delete({
      created: Raw((alias) => `${alias} < CURRENT_DATE - ${process.env.CLEAN_NOTIFICATIONS_AFTER_DAYS}`),
    });
  }

  find(query: FindQueryDto) {
    const { where, take, skip } = query;

    return this.notificationRepository.find({ where, take, skip });
  }

  updateRead(id: number) {
    return this.notificationRepository.update({ id }, { read: true });
  }
}
