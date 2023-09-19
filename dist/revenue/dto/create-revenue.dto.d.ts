import { PayMethod } from '../enum/payMethod';
import { typeRevenue } from '../enum/typeRevenue';
export declare class CreateRevenueDto {
    name: string;
    coin: string;
    value: number;
    sourceId: string;
    tagId: string;
    payMethod: PayMethod;
    date?: Date;
    description: string;
    typeRevenue: typeRevenue;
    userId: string;
}
