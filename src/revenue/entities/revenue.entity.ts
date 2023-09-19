import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Source } from 'src/sources/entities/source.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PayMethod } from '../enum/payMethod';
import { typeRevenue } from '../enum/typeRevenue';

@Entity()
export class Revenue extends AbstractClass {
  @Column()
  name: string;

  @Column()
  coin: string;

  @Column({ type: 'decimal' })
  value: number;

  @Column()
  payMethod: PayMethod;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  typeRevenue: typeRevenue;

  @ManyToOne(() => User, (user) => user.revenues)
  user: User;

  @ManyToOne(() => Source, (source) => source.revenues)
  source: Source;

  @ManyToOne(() => Tag, (tag) => tag.revenues)
  tag: Tag;
}
