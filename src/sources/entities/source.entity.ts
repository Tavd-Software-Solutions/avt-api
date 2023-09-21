import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Revenue } from 'src/revenue/entities/revenue.entity';
import { User } from 'src/users/entities/user.entity';

export class Source extends AbstractClass {
  name: string;
  user: User;
  revenues: Revenue[];
}
