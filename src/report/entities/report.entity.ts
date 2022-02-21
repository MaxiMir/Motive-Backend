import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { ReportTypeDto } from 'src/report/dto/report-type.dto';
import { ReasonTypeDto } from 'src/report/dto/reason-type.dto';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column()
  entityId: number;

  @Column({
    type: 'enum',
    enum: ReportTypeDto,
    nullable: false,
  })
  type: ReportTypeDto;

  @Column({
    type: 'enum',
    enum: ReasonTypeDto,
    nullable: false,
  })
  reason: ReasonTypeDto;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
    description: 'created message',
  })
  date: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;
}
