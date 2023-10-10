import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PayMethod, TypeRevenue } from '../enums/enum';

export class CreateRevenueDto {
  @ApiProperty({
    example: 'Chefe Lopez',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'BRL',
  })
  @IsNotEmpty()
  coin: string;

  @ApiProperty({
    example: 400,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: 'a3b627f3-3db0-4e6d-ba84-7235b8505820',
  })
  @IsString()
  @IsNotEmpty()
  sourceId: string;

  @ApiProperty({
    example: 'a48765d9-2c95-4f4e-8c49-1d0b2d53286c',
  })
  @IsString()
  @IsNotEmpty()
  tagId: string;

  @ApiProperty({
    example: PayMethod.CREDITCARD,
  })
  @IsEnum(PayMethod)
  @IsNotEmpty()
  payMethod: PayMethod;

  @ApiProperty({
    example: new Date(),
  })
  date?: Date;

  @ApiProperty({
    example: 'Almocos no Chefe lops',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: TypeRevenue.EXPENSE,
  })
  @IsEnum(TypeRevenue)
  @IsNotEmpty()
  typeRevenue: TypeRevenue;

  @ApiProperty({
    example: 'b4d02f14-2cf9-4ce1-9fa7-c94b07cd9e75',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
