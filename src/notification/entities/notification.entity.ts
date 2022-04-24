import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NOTIFICATION } from 'src/common/notification';
import { User } from 'src/user/entities/user.entity';
import { UserBaseDto } from 'src/user/dto/user-base.dto';

@Entity('notifications', {
  orderBy: {
    id: 'DESC',
  },
})
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: NOTIFICATION,
    nullable: false,
  })
  type: NOTIFICATION;

  @Column('simple-json')
  public details: { id?: number; day?: number; name?: string; user: UserBaseDto };

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created: Date;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  recipient: User;

  @Column('boolean', { default: false })
  read = false;
}
