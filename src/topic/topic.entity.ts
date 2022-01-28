import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TopicBase, TopicDirectory } from 'src/abstracts/topic-base.entity';
import { Answer } from 'src/answer/answer.entity';
import { Day } from 'src/day/day.entity';

@Entity('topics')
export class Topic extends TopicBase {
  @Column({
    type: 'enum',
    enum: TopicDirectory,
    nullable: false,
  })
  type: TopicDirectory;

  @OneToMany(() => Answer, (answer) => answer.topic, {
    eager: true,
  })
  answers: Answer[];

  @ManyToOne(() => Day, { cascade: true, nullable: false })
  day: Day;
}
