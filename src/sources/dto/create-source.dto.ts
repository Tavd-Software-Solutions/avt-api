import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSourceDto {
  @ApiProperty({
    example: 'Source default',
    description: `Default Source`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
