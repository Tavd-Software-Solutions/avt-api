import { PayMethod, TypeRevenue } from './enums';

export class UpdateRevenueDto {
  name: string;
  coin: string;
  value: number;
  sourceId: string;
  tagId: string;
  payMethod: PayMethod;
  date: Date;
  description: string;
  typeRevenue: TypeRevenue;
  userId: string;
}
