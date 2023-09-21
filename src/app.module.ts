import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SourcesModule } from './sources/sources.module';
import { TagsModule } from './tags/tags.module';
import { RevenueModule } from './revenue/revenue.module';

@Module({
  imports: [UsersModule, AuthModule, SourcesModule, TagsModule, RevenueModule],
})
export class AppModule {}
