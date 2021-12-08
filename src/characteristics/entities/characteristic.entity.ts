import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  motivation: number;

  @Column({ default: 0 })
  creativity: number;

  @Column({ default: 0 })
  support: number;

  @Column({ default: 0 })
  completed: number;

  @Column({ default: 0 })
  abandoned: number;

  @Column({ default: 0 })
  awards: number;
}
