import { ApiProperty } from '@nestjs/swagger';

export class GetRecoverCodeDTO {
  @ApiProperty({
    example: 'usuario_teste@teste.com',
  })
  email: string;
}
