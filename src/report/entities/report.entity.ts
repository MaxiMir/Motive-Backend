import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
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
    example: '2021-08-15 21:05:15.723336+07',
    description: 'created message',
  })
  date: string;
}
