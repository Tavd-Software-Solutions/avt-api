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
import { Tag } from '@prisma/client';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('create')
  @ApiResponse({ status: 201 })
  create(@Body() createTagDto: CreateTagDto): Promise<any> {
    return this.tagsService.create(createTagDto);
  }

  @Get('list-all')
  @ApiResponse({ status: 200 })
  findAll(@Request() request: any): Promise<Tag[]> {
    return this.tagsService.findAll(request);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200 })
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Put('edit/:id')
  @ApiResponse({ status: 200 })
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<any> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string, @Request() request: any): Promise<any> {
    return this.tagsService.softDelete(id, request);
  }
}
