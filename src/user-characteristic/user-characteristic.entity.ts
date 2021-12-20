import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MainCharacteristicsDto } from 'src/abstract/main-characteristics.dto';
import { User } from 'src/user/user.entity';

@Entity('user-characteristics')
export class UserCharacteristic extends MainCharacteristicsDto {
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
  followers: number;

  @OneToOne(() => User)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => User })
  user: User;
}
