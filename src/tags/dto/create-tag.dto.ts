import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'Lunch',
    description: `Lunch tag`,
  })
  name: string;
  @ApiProperty({
    example: 'b4d02f14-2cf9-4ce1-9fa7-c94b07cd9e75',
  })
  userId: string;
}
