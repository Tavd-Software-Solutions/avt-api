import { ApiProperty } from '@nestjs/swagger';

export class CreateSourceDto {
  @ApiProperty({
    example: 'Source default',
    description: `Default Source`,
  })
  name: string;

  @ApiProperty({
    example: 'b4d02f14-2cf9-4ce1-9fa7-c94b07cd9e75',
  })
  userId: string;
}
