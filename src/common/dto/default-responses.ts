import { ApiProperty } from '@nestjs/swagger';

export class CreatedEntity {
  @ApiProperty({
    example: 'EntityName created successfully',
  })
  message: string;
}

export class UpdatedEntity {
  @ApiProperty({
    example: 'EntityName updated successfully',
  })
  message: string;
}

export class DeletedEntity {
  @ApiProperty({
    example: 'EntityName deleted successfully',
  })
  message: string;
}
