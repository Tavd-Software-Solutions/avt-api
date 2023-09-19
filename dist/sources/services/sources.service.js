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
exports.SourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const source_entity_1 = require("../entities/source.entity");
const typeorm_2 = require("typeorm");
const common_service_1 = require("../../common/services/common.service");
const users_service_1 = require("../../users/services/users.service");
let SourcesService = class SourcesService {
    constructor(sourceRepository, userService) {
        this.sourceRepository = sourceRepository;
        this.userService = userService;
        this.logger = new common_1.Logger(source_entity_1.Source.name);
    }
    async create(createSourceDto) {
        if (createSourceDto.name === '' || !createSourceDto.name)
            throw new common_1.HttpException('Tag is empty', 404);
        if (createSourceDto.userId === '' || !createSourceDto.userId)
            throw new common_1.HttpException('User is empty', 404);
        try {
            const { userId } = createSourceDto;
            const user = await this.userService.findOne(userId);
            if (!user)
                throw new common_1.HttpException('user_not_found', 404);
            const newSource = new source_entity_1.Source();
            newSource.name = createSourceDto.name;
            newSource.user = user;
            const source = this.sourceRepository.create(newSource);
            this.logger.log('Source created successfully');
            this.sourceRepository.save(source);
            return { message: `Source ${source.name} created successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findAll(context) {
        try {
            const userId = (0, common_service_1.convertToken)(context);
            const query = this.sourceRepository
                .createQueryBuilder('source')
                .where('source.deletedAt IS NULL')
                .andWhere('(source.userId = :userId OR source.userId IS NULL)', {
                userId,
            });
            return query.getMany();
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findOne(id) {
        try {
            const source = await this.sourceRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!source)
                throw new common_1.HttpException('Source not found', 404);
            return source;
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async update(id, updateSourceDto) {
        try {
            const source = await this.sourceRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!source)
                throw new common_1.HttpException('Source not found', 404);
            source.name = updateSourceDto.name;
            source.updatedAt = new Date();
            await this.sourceRepository.update(id, source);
            return { message: `Source ${source.name} updated successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async softDelete(id, context) {
        try {
            const userId = (0, common_service_1.convertToken)(context);
            const source = await this.sourceRepository
                .findOne({ where: { id: id, user: { id: userId } } })
                .then((source) => {
                source.deletedAt = new Date();
                return this.sourceRepository.save(source);
            });
            return { message: `Source ${source.name} deleted successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
};
SourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(source_entity_1.Source)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UserService])
], SourcesService);
exports.SourcesService = SourcesService;
//# sourceMappingURL=sources.service.js.map