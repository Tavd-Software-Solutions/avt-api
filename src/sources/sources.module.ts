import { Module } from '@nestjs/common';
import { SourcesService } from './services/sources.service';
import { SourcesController } from './sources.controller';

@Module({
  controllers: [SourcesController],
  providers: [SourcesService],
  exports: [SourcesService],
})
export class SourcesModule {}
