import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponse {
  @ApiProperty({
    example: 'usuario_teste@teste.com',
  })
  email: string;

  @ApiProperty({
    example: 'usuario_teste',
  })
  name: string;

  @ApiProperty({
    example: 'user_test',
  })
  login: string;

  @ApiProperty({
    example: 'BRL',
  })
  coin: string;
}
