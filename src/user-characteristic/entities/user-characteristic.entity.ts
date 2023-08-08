import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('user-characteristics')
export class UserCharacteristicEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1541,
    description: 'user points',
  })
  points: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1541,
    description: 'points for next level',
  })
  nextLevelPoints: number;

  @Column({ type: 'float', scale: 4, default: 1.0 })
  @ApiProperty({
    example: 13,
  })
  progress: number;

  // calculated in afterLoad
  public level: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 3,
    description: 'health points',
  })
  health: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 3,
    description: 'family points',
  })
  family: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 9,
    description: 'money points',
  })
  money: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 9,
    description: 'friends points',
  })
  friends: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 9,
    description: 'development points',
  })
  development: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 3,
    description: 'work points',
  })
  work: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 5,
    description: 'vacation points',
  })
  vacation: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @ApiProperty({
    example: 5,
    description: 'hobbies points',
  })
  hobbies: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1,
  })
  completed: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 5,
  })
  abandoned: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 0,
  })
  followers: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 0,
  })
  following: number;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  @ApiHideProperty()
  user: UserEntity;
}
