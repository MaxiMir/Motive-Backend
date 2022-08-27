import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationDto as NotificationGuide } from 'src/common/notification.dto';
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
    enum: NotificationGuide,
    nullable: false,
  })
  type: NotificationGuide;

  @Column('simple-json')
  public details: DetailsDto;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created: Date;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  recipient: UserEntity;

  @Column('boolean', { default: false })
  read = false;
}
