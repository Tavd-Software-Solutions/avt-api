import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PayMethod, TypeRevenue } from '../enums/enum';

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface WhereDto {
  name?: string;
  value?: number;
  tagId?: string;
  payMethod?: PayMethod;
  typeRevenue?: TypeRevenue;
  startDate?: Date;
  endDate?: Date;
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @ApiProperty({
    example: {
      name: 'Conta de Luz',
      value: 172,
      tagId: '70d1b7eb-01ca-4f43-bea9-9031e2c889fc',
      payMethod: PayMethod.MONEY,
    },
  })
  readonly where: WhereDto;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;
}

export class PageDto<T> {
  constructor(data: T[], options: PageMetaDto) {
    this.data = data;
    this.options = options;
  }

  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ type: PageMetaDto })
  options: PageMetaDto;
}
