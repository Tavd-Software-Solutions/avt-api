"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueService = void 0;
const common_1 = require("@nestjs/common");
const revenue_entity_1 = require("../entities/revenue.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_service_1 = require("../../common/services/common.service");
const page_dto_1 = require("../dto/page.dto");
const tags_service_1 = require("../../tags/services/tags.service");
const sources_service_1 = require("../../sources/services/sources.service");
const users_service_1 = require("../../users/services/users.service");
const typeRevenue_1 = require("../enum/typeRevenue");
let RevenueService = class RevenueService {
    constructor(revenueRepository, userService, sourceService, tagService) {
        this.revenueRepository = revenueRepository;
        this.userService = userService;
        this.sourceService = sourceService;
        this.tagService = tagService;
        this.logger = new common_1.Logger(revenue_entity_1.Revenue.name);
    }
    async create(createRevenueDto) {
        const { sourceId, tagId, userId } = createRevenueDto;
        const user = await this.userService.findOne(userId);
        if (!user)
            throw new common_1.HttpException('user_not_found', 404);
        const source = await this.sourceService.findOne(sourceId);
        if (!source)
            throw new common_1.HttpException('source_not_found', 404);
        const tag = await this.tagService.findOne(tagId);
        if (!tag)
            throw new common_1.HttpException('tag_not_found', 404);
        const newRevenue = new revenue_entity_1.Revenue();
        newRevenue.name = createRevenueDto.name;
        newRevenue.coin = createRevenueDto.coin;
        newRevenue.value = createRevenueDto.value;
        newRevenue.source = source;
        newRevenue.tag = tag;
        newRevenue.payMethod = createRevenueDto.payMethod;
        newRevenue.description = createRevenueDto.description;
        newRevenue.typeRevenue = createRevenueDto.typeRevenue;
        newRevenue.user = user;
        newRevenue.date = new Date(createRevenueDto.date);
        try {
            await this.revenueRepository.save(newRevenue);
            this.logger.log('Revenue created successfully');
            return {
                message: `Revenue ${createRevenueDto.name} created successfully`,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findAll(pageOptionsDto, context) {
        try {
            const { order, skip, take, where } = pageOptionsDto;
            const queryBuilder = this.revenueRepository.createQueryBuilder('revenue');
            const userId = (0, common_service_1.convertToken)(context);
            const { whereString, values } = this.buildWhere(where);
            queryBuilder
                .orderBy('revenue.createdAt', order)
                .skip(skip)
                .take(take)
                .leftJoinAndSelect('revenue.tag', 'tag')
                .where(whereString, values)
                .andWhere('revenue.userId = :user', { user: userId });
            const itemCount = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();
            const pageMetaDto = new page_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
            return new page_dto_1.PageDto(entities, pageMetaDto);
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findOne(id) {
        try {
            const revenue = await this.revenueRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
                relations: ['tag', 'source'],
            });
            if (!revenue)
                throw new common_1.HttpException('Revenue not found', 404);
            return revenue;
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async update(id, updateRevenueDto) {
        const { sourceId, tagId } = updateRevenueDto;
        try {
            const revenue = await this.revenueRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
            });
            if (!revenue)
                throw new common_1.HttpException('Revenue not found', 404);
            const source = await this.sourceService.findOne(sourceId);
            if (!source)
                throw new common_1.HttpException('source_not_found', 404);
            const tag = await this.tagService.findOne(tagId);
            if (!tag)
                throw new common_1.HttpException('tag_not_found', 404);
            revenue.name = updateRevenueDto.name;
            revenue.coin = updateRevenueDto.coin;
            revenue.value = updateRevenueDto.value;
            revenue.payMethod = updateRevenueDto.payMethod;
            revenue.date = updateRevenueDto.date;
            revenue.description = updateRevenueDto.description;
            revenue.typeRevenue = updateRevenueDto.typeRevenue;
            revenue.source = source;
            revenue.tag = tag;
            revenue.updatedAt = new Date();
            await this.revenueRepository.update(id, revenue);
            return {
                message: `Revenue ${updateRevenueDto.name} updated successfully`,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async softDelete(id) {
        try {
            const revenue = await this.revenueRepository
                .findOneBy({ id })
                .then((revenue) => {
                revenue.deletedAt = new Date();
                return this.revenueRepository.save(revenue);
            });
            return {
                message: `Revenue ${revenue.name} deleted successfully`,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async getAmount(context) {
        try {
            const queryBuilder = this.revenueRepository.createQueryBuilder('revenue');
            const userId = (0, common_service_1.convertToken)(context);
            queryBuilder
                .where('revenue.deletedAt is null')
                .andWhere('revenue.userId = :user', { user: userId });
            const { entities } = await queryBuilder.getRawAndEntities();
            const amount = entities.reduce((amount, entity) => {
                let value = 0;
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.EXPENSE) {
                    value = amount - Number(entity.value);
                }
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.INCOMING) {
                    value = amount + Number(entity.value);
                }
                return value;
            }, 0);
            return amount;
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async getPieChart(context) {
        try {
            const userId = (0, common_service_1.convertToken)(context);
            const query = this.revenueRepository
                .createQueryBuilder('revenue')
                .where('revenue.deletedAt IS NULL')
                .andWhere('revenue.userId = :userId ', {
                userId,
            });
            const { entities } = await query.getRawAndEntities();
            const totalExpenses = entities.reduce((total, entity) => {
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.EXPENSE) {
                    return total + Number(entity.value);
                }
                return total;
            }, 0);
            const totalIncomings = entities.reduce((total, entity) => {
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.INCOMING) {
                    return total + Number(entity.value);
                }
                return total;
            }, 0);
            return { expense: totalExpenses, incoming: totalIncomings };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async getStackedChart(context) {
        try {
            const userId = (0, common_service_1.convertToken)(context);
            const currentDate = new Date();
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const query = this.revenueRepository
                .createQueryBuilder('revenue')
                .where('revenue.deletedAt IS NULL')
                .andWhere('revenue.userId = :userId ', {
                userId,
            })
                .andWhere('revenue.date BETWEEN :startDate AND :endDate', {
                startDate: firstDayOfMonth,
                endDate: lastDayOfMonth,
            });
            const { entities } = await query.getRawAndEntities();
            const sortedDates = entities
                .map((entity) => entity.date)
                .sort((a, b) => {
                const dateA = new Date(a);
                const dateB = new Date(b);
                return dateA.getTime() - dateB.getTime();
            });
            const listDates = Array.from(new Set(sortedDates.map((date) => this.formatDate(date))));
            const listExpenses = entities.reduce((accumulator, entity) => {
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.EXPENSE) {
                    accumulator.push(Number(entity.value));
                }
                return accumulator;
            }, []);
            const listIncomings = entities.reduce((accumulator, entity) => {
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.INCOMING) {
                    accumulator.push(Number(entity.value));
                }
                return accumulator;
            }, []);
            return {
                dates: listDates,
                expenses: listExpenses,
                incomings: listIncomings,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async getBarChart(pageOptionsDto, context) {
        try {
            const where = pageOptionsDto;
            const queryBuilder = this.revenueRepository.createQueryBuilder('revenue');
            const userId = (0, common_service_1.convertToken)(context);
            const { whereString, values } = this.buildWhere(where);
            queryBuilder
                .orderBy('revenue.createdAt', 'ASC')
                .leftJoinAndSelect('revenue.tag', 'tag')
                .where(whereString, values)
                .andWhere('revenue.userId = :user', { user: userId });
            const { entities } = await queryBuilder.getRawAndEntities();
            const listDates = entities
                .map((entity) => entity.date)
                .sort((a, b) => {
                const dateA = new Date(a);
                const dateB = new Date(b);
                return dateA.getTime() - dateB.getTime();
            })
                .map((date) => this.formatDate(date));
            const listRevenues = entities.reduce((accumulator, entity) => {
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.EXPENSE) {
                    accumulator.push(Number(entity.value) * -1);
                }
                if (entity.typeRevenue === typeRevenue_1.typeRevenue.INCOMING) {
                    accumulator.push(Number(entity.value));
                }
                return accumulator;
            }, []);
            return {
                dates: listDates,
                data: listRevenues,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    buildWhere(options, deteleted = false) {
        let whereString = '';
        const values = {};
        if (options.name && options.name != '') {
            whereString += `revenue.name like :name`;
            values['name'] = `%${options.name}%`;
        }
        if (options.payMethod) {
            const condition = `revenue.payMethod = :payMethod`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['payMethod'] = options.payMethod;
        }
        if (options.typeRevenue) {
            const condition = `revenue.typeRevenue = :typeRevenue`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['typeRevenue'] = options.typeRevenue;
        }
        if (options.tagId) {
            const condition = `revenue.tagId = :tagId`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['tagId'] = options.tagId;
        }
        if (options.value) {
            const condition = `revenue.value = :value`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['value'] = options.value;
        }
        if (options.startDate && !options.endDate) {
            const condition = `revenue.date >= :startDate`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['startDate'] = options.startDate;
        }
        if (!options.startDate && options.endDate) {
            const condition = `revenue.date <= :endDate`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['endDate'] = options.endDate;
        }
        if (options.startDate && options.endDate) {
            const condition = `revenue.date >= :startDate AND revenue.date <= :endDate`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
            values['startDate'] = options.startDate;
            values['endDate'] = options.endDate;
        }
        if (!deteleted) {
            const condition = `revenue.deletedAt is null`;
            whereString.length > 0
                ? (whereString += ` AND ${condition}`)
                : (whereString = `${condition}`);
        }
        return {
            whereString,
            values,
        };
    }
    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    }
};
RevenueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(revenue_entity_1.Revenue)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UserService,
        sources_service_1.SourcesService,
        tags_service_1.TagsService])
], RevenueService);
exports.RevenueService = RevenueService;
//# sourceMappingURL=revenue.service.js.map