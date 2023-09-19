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
import { Source } from './entities/source.entity';
import { DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';

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
  @ApiResponse({ status: 200, type: [Source] })
  findAll(@Request() request: any): Promise<Source[]> {
    return this.sourcesService.findAll(request);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200, type: Source })
  findOne(@Param('id') id: string): Promise<Source> {
    return this.sourcesService.findOne(id);
  }

  @Put('edit/:id')
  @ApiResponse({ status: 200, type: UpdatedEntity })
  update(
    @Param('id') id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ): Promise<UpdatedEntity> {
    return this.sourcesService.update(id, updateSourceDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, type: DeletedEntity })
  remove(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<DeletedEntity> {
    return this.sourcesService.softDelete(id, request);
  }
}
