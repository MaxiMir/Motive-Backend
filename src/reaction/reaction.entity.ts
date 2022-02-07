import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
import { Day } from 'src/day/day.entity';

@Entity('reactions')
export class Reaction {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: CHARACTERISTICS,
    nullable: false,
  })
  characteristic: Characteristic;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @OneToOne(() => Day, { nullable: false })
  @JoinColumn()
  day: Day;
}
