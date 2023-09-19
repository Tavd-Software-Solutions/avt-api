import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordDTO {
  @ApiProperty({
    example: 'teste1234',
    description: `New password`,
  })
  newPassword: string;
}

export class RecoverPasswordResponse {
  @ApiProperty({
    example: 'Password updated successfully',
  })
  message: string;
}
