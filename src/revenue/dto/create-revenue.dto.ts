import { ApiProperty } from '@nestjs/swagger';
import { PayMethod, TypeRevenue } from '@prisma/client';

export class CreateRevenueDto {
  @ApiProperty({
    example: 'Chefe Lopez',
  })
  name: string;

  @ApiProperty({
    example: 'BRL',
  })
  coin: string;

  @ApiProperty({
    example: 400,
  })
  value: number;

  @ApiProperty({
    example: 'a3b627f3-3db0-4e6d-ba84-7235b8505820',
  })
  sourceId: string;

  @ApiProperty({
    example: 'a48765d9-2c95-4f4e-8c49-1d0b2d53286c',
  })
  tagId: string;

  @ApiProperty({
    example: PayMethod.CREDITCARD,
  })
  payMethod: PayMethod;

  @ApiProperty({
    example: new Date(),
  })
  date?: Date;

  @ApiProperty({
    example: 'Almocos no Chefe lops',
  })
  description: string;

  @ApiProperty({
    example: TypeRevenue.EXPENSE,
  })
  typeRevenue: TypeRevenue;

  @ApiProperty({
    example: 'b4d02f14-2cf9-4ce1-9fa7-c94b07cd9e75',
  })
  userId: string;
}
