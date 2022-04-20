import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindQueryDto } from './dto/find-query.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  find(query: FindQueryDto) {
    const { where, take, skip } = query;

    return this.notificationRepository.find({
      where,
      take,
      skip,
    });
  }

  updateRead(id: number) {
    return this.notificationRepository.update({ id }, { read: true });
  }
}
