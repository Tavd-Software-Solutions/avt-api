import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { SourcesService } from './services/sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Source } from '@prisma/client';

@ApiTags('sources')
@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Post('create')
  @ApiResponse({ status: 201, type: CreateSourceDto })
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

  @Get('list-all')
  @ApiResponse({ status: 200 })
  findAll(@Request() request: any): Promise<Source[]> {
    return this.sourcesService.findAll(request);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200 })
  findOne(@Param('id') id: string): Promise<Source> {
    return this.sourcesService.findOne(id);
  }

  @Put('edit/:id')
  @ApiResponse({ status: 200 })
  update(
    @Param('id') id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ): Promise<any> {
    return this.sourcesService.update(id, updateSourceDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200 })
  remove(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<any> {
    return this.sourcesService.softDelete(id, request);
  }
}
