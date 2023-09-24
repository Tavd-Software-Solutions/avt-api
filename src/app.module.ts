import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SourcesModule } from './sources/sources.module';
import { TagsModule } from './tags/tags.module';
import { RevenueModule } from './revenue/revenue.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    SourcesModule,
    TagsModule,
    RevenueModule,
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}
