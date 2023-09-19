import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreatedEntity, DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';
import { Tag } from './entities/tag.entity';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<CreatedEntity>;
    findAll(request: any): Promise<Tag[]>;
    findOne(id: string): Promise<Tag>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<UpdatedEntity>;
    remove(id: string, request: any): Promise<DeletedEntity>;
}
