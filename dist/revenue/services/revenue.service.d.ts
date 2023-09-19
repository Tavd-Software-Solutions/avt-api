import { CreateRevenueDto } from '../dto/create-revenue.dto';
import { UpdateRevenueDto } from '../dto/update-revenue.dto';
import { Revenue } from '../entities/revenue.entity';
import { Repository } from 'typeorm';
import { PageDto, PageOptionsDto, WhereDto } from '../dto/page.dto';
import { TagsService } from 'src/tags/services/tags.service';
import { SourcesService } from 'src/sources/services/sources.service';
import { UserService } from 'src/users/services/users.service';
import { CreatedEntity, DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';
import { IBarChart, IPieChart, IStackedChart } from '../dto/charts-interface.dto';
export declare class RevenueService {
    private revenueRepository;
    private userService;
    private sourceService;
    private tagService;
    private logger;
    constructor(revenueRepository: Repository<Revenue>, userService: UserService, sourceService: SourcesService, tagService: TagsService);
    create(createRevenueDto: CreateRevenueDto): Promise<CreatedEntity>;
    findAll(pageOptionsDto: PageOptionsDto, context: any): Promise<PageDto<Revenue>>;
    findOne(id: string): Promise<Revenue>;
    update(id: string, updateRevenueDto: UpdateRevenueDto): Promise<UpdatedEntity>;
    softDelete(id: string): Promise<DeletedEntity>;
    getAmount(context: any): Promise<number>;
    getPieChart(context: any): Promise<IPieChart>;
    getStackedChart(context: any): Promise<IStackedChart>;
    getBarChart(pageOptionsDto: WhereDto, context: any): Promise<IBarChart>;
    private buildWhere;
    private formatDate;
}
