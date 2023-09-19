import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetRecoverCodeDTO {
  @ApiProperty({
    example: 'usuario_teste@teste.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}
