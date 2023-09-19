import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../entities/tag.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/services/users.service';
import { CreatedEntity, DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';
export declare class TagsService {
    private tagRepository;
    private userService;
    private logger;
    constructor(tagRepository: Repository<Tag>, userService: UserService);
    create(createTagDto: CreateTagDto): Promise<CreatedEntity>;
    findAll(context: any): Promise<Tag[]>;
    findOne(id: string): Promise<Tag>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<UpdatedEntity>;
    softDelete(id: string, context: any): Promise<DeletedEntity>;
}
