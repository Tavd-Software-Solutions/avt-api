import { Module } from '@nestjs/common';
import { RevenueService } from './services/revenue.service';
import { RevenueController } from './revenue.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
