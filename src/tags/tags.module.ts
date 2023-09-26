import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './tags.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { UsersModule } from '../../src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
