import { CreateSourceDto } from '../dto/create-source.dto';
import { UpdateSourceDto } from '../dto/update-source.dto';
import { Source } from '../entities/source.entity';
import { Repository } from 'typeorm';
import { DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';
import { UserService } from 'src/users/services/users.service';
export declare class SourcesService {
    private sourceRepository;
    private userService;
    private logger;
    constructor(sourceRepository: Repository<Source>, userService: UserService);
    create(createSourceDto: CreateSourceDto): Promise<{
        message: string;
    }>;
    findAll(context: any): Promise<Source[]>;
    findOne(id: string): Promise<Source>;
    update(id: string, updateSourceDto: UpdateSourceDto): Promise<UpdatedEntity>;
    softDelete(id: string, context: any): Promise<DeletedEntity>;
}
