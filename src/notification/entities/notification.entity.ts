import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationTypeDto } from 'src/notification/dto/notification.type.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { DetailsDto } from 'src/notification/dto/details.dto';

@Entity('notifications', {
  orderBy: {
    id: 'DESC',
  },
})
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: NotificationTypeDto,
    nullable: false,
  })
  type: NotificationTypeDto;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column('simple-json', { nullable: true })
  details: DetailsDto;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn()
  initiator: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  recipient: UserEntity;

  @Column('boolean', { default: false })
  read = false;
}
