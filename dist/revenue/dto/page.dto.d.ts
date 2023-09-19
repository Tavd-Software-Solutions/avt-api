import { Order } from '../enum/order';
import { PayMethod } from '../enum/payMethod';
import { typeRevenue } from '../enum/typeRevenue';
export interface WhereDto {
    name?: string;
    value?: number;
    tagId?: string;
    payMethod?: PayMethod;
    typeRevenue?: typeRevenue;
    startDate?: Date;
    endDate?: Date;
}
export declare class PageOptionsDto {
    readonly order?: Order;
    readonly page?: number;
    readonly take?: number;
    readonly where: WhereDto;
    get skip(): number;
}
export interface PageMetaDtoParameters {
    pageOptionsDto: PageOptionsDto;
    itemCount: number;
}
export declare class PageMetaDto {
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters);
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
}
export declare class PageDto<T> {
    constructor(data: T[], options: PageMetaDto);
    data: T[];
    options: PageMetaDto;
}
