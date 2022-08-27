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
    description: 'motivation points',
  })
  motivation_all: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1541,
    description: 'creativity points',
  })
  creativity_all: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1541,
    description: 'support points',
  })
  support_all: number;

  @Column({ type: 'float', scale: 4, default: 1.0 })
  @ApiProperty({
    example: 13,
  })
  motivation: number;

  @Column({ type: 'float', scale: 4, default: 1.0 })
  @ApiProperty({
    example: 26,
  })
  creativity: number;

  @Column({ type: 'float', scale: 4, default: 1.0 })
  @ApiProperty({
    example: 3,
  })
  support: number;

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

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  @ApiHideProperty()
  user: UserEntity;
}
