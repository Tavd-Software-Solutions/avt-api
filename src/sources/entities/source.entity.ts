import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Revenue } from 'src/revenue/entities/revenue.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Source extends AbstractClass {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.sources)
  user: User;

  @OneToMany(() => Revenue, (revenue) => revenue.source)
  revenues: Revenue[];
}
