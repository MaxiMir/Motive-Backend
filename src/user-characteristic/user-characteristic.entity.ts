import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MainCharacteristics } from 'src/abstract/main-characteristics';
import { User } from 'src/user/user.entity';

@Entity('user-characteristics')
export class UserCharacteristic extends MainCharacteristics {
  @ApiProperty({
    example: 1,
  })
  @Column({ default: 0 })
  completed: number;

  @ApiProperty({
    example: 5,
  })
  @Column({ default: 0 })
  abandoned: number;

  @ApiProperty({
    example: 0,
  })
  @Column({ default: 0 })
  awards: number;

  @OneToOne(() => User)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => User })
  user: User;
}
