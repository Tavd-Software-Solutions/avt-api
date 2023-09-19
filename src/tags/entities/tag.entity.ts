import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Revenue } from 'src/revenue/entities/revenue.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Tag extends AbstractClass {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @OneToMany(() => Revenue, (revenue) => revenue.tag)
  revenues: Revenue[];
}
