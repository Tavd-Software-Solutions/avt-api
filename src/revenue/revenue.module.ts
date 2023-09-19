import { Module } from '@nestjs/common';
import { RevenueService } from './services/revenue.service';
import { RevenueController } from './revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from './entities/revenue.entity';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { SourcesModule } from 'src/sources/sources.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Revenue]),
    UsersModule,
    TagsModule,
    SourcesModule,
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
