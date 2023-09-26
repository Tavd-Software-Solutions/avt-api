import { Module } from '@nestjs/common';
import { RevenueService } from './services/revenue.service';
import { RevenueController } from './revenue.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { UsersModule } from '../../src/users/users.module';
import { TagsModule } from '../../src/tags/tags.module';
import { SourcesModule } from '../../src/sources/sources.module';

@Module({
  imports: [PrismaModule, UsersModule, SourcesModule, TagsModule],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
