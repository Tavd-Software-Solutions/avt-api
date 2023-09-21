import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Revenue } from 'src/revenue/entities/revenue.entity';
import { Source } from 'src/sources/entities/source.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export class User extends AbstractClass {
  email: string;
  name: string;
  password: string;
  coin: string;
  login: string;
  revenues: Revenue[];
  tags: Tag[];
  sources: Source[];
  recoverCode: string;
}
