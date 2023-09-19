import { AbstractClass } from 'src/database/abstractClass/abstracClass.class';
import { Source } from 'src/sources/entities/source.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { PayMethod } from '../enum/payMethod';
import { typeRevenue } from '../enum/typeRevenue';
export declare class Revenue extends AbstractClass {
    name: string;
    coin: string;
    value: number;
    payMethod: PayMethod;
    date: Date;
    description: string;
    typeRevenue: typeRevenue;
    user: User;
    source: Source;
    tag: Tag;
}
