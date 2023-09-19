import { RevenueService } from './services/revenue.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { PageDto, PageOptionsDto, WhereDto } from './dto/page.dto';
import { Revenue } from './entities/revenue.entity';
import { CreatedEntity, DeletedEntity, UpdatedEntity } from 'src/common/dto/default-responses';
import { IBarChart, IPieChart, IStackedChart } from './dto/charts-interface.dto';
export declare class RevenueController {
    private readonly revenueService;
    constructor(revenueService: RevenueService);
    create(createRevenueDto: CreateRevenueDto): Promise<CreatedEntity>;
    findAll(pageOptionsDto: PageOptionsDto, request: any): Promise<PageDto<Revenue>>;
    findOne(id: string): Promise<Revenue>;
    getAmount(request: any): Promise<number>;
    getPieChart(request: any): Promise<IPieChart>;
    getStackedChart(request: any): Promise<IStackedChart>;
    getBarChart(pageOptionsDto: WhereDto, request: any): Promise<IBarChart>;
    update(id: string, updateRevenueDto: UpdateRevenueDto): Promise<UpdatedEntity>;
    remove(id: string): Promise<DeletedEntity>;
}
