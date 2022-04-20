import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TMPL } from 'src/common/notification';
import { User } from 'src/user/entities/user.entity';
import { UserBaseDto } from 'src/user/dto/user-base.dto';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: TMPL,
    nullable: false,
  })
  tmpl: TMPL;

  @Column('simple-json')
  public details: { id: number; day: number; user: UserBaseDto };

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created: Date;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  recipient: User;

  @Column('boolean', { default: false })
  read = false;
}
