import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
