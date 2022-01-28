import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { TopicBase } from 'src/abstracts/topic-base.entity';
import { Topic } from 'src/topic/topic.entity';

@Entity('answers')
export class Answer extends TopicBase {
  @ManyToOne(() => Topic)
  @JoinTable()
  topic: Topic;
}
