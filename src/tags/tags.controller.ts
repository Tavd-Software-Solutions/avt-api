import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatedEntity,
  DeletedEntity,
  UpdatedEntity,
} from 'src/common/dto/default-responses';
import { Tag } from './entities/tag.entity';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('create')
  @ApiResponse({ status: 201, type: CreatedEntity })
  create(@Body() createTagDto: CreateTagDto): Promise<CreatedEntity> {
    return this.tagsService.create(createTagDto);
  }

  @Get('list-all')
  @ApiResponse({ status: 200, type: [Tag] })
  findAll(@Request() request: any): Promise<Tag[]> {
    return this.tagsService.findAll(request);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200, type: Tag })
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Put('edit/:id')
  @ApiResponse({ status: 200, type: UpdatedEntity })
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdatedEntity> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, type: CreatedEntity })
  remove(
    @Param('id') id: string,
    @Request() request: any,
  ): Promise<DeletedEntity> {
    return this.tagsService.softDelete(id, request);
  }
}
