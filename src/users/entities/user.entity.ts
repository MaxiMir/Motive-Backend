import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('varchar', { unique: true, length: 256 })
  nickname: string;

  @Column()
  name: string;

  @Column({ unique: true })
  avatar: string;
}
