import { Module } from '@nestjs/common';
import { SourcesService } from './services/sources.service';
import { SourcesController } from './sources.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { UsersModule } from '../../src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [SourcesController],
  providers: [SourcesService],
  exports: [SourcesService],
})
export class SourcesModule {}
