import { SourcesService } from './services/sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source } from './entities/source.entity';
import { DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';
export declare class SourcesController {
    private readonly sourcesService;
    constructor(sourcesService: SourcesService);
    create(createSourceDto: CreateSourceDto): Promise<{
        message: string;
    }>;
    findAll(request: any): Promise<Source[]>;
    findOne(id: string): Promise<Source>;
    update(id: string, updateSourceDto: UpdateSourceDto): Promise<UpdatedEntity>;
    remove(id: string, request: any): Promise<DeletedEntity>;
}
