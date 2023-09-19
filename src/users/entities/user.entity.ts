import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Revenue } from 'src/revenue/entities/revenue.entity';
import { Source } from 'src/sources/entities/source.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractClass {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  coin: string;

  @Column({ unique: true })
  login: string;

  @OneToMany(() => Revenue, (revenue) => revenue.user)
  revenues: Revenue[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Source, (source) => source.user)
  sources: Source[];

  @Column({ nullable: true })
  recoverCode: string;
}
