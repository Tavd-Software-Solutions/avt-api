import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'usuario_teste@teste.com',
  })
  email: string;

  @ApiProperty({
    example: 'usuario_teste',
  })
  name: string;

  @ApiProperty({
    example: 'testando123',
  })
  password: string;

  @ApiProperty({
    example: 'user_test',
  })
  login: string;

  @ApiProperty({
    example: 'BRL',
  })
  coin: string;
}
