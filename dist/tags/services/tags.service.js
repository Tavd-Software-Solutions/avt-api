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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const tag_entity_1 = require("../entities/tag.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_service_1 = require("../../common/services/common.service");
const users_service_1 = require("../../users/services/users.service");
let TagsService = class TagsService {
    constructor(tagRepository, userService) {
        this.tagRepository = tagRepository;
        this.userService = userService;
        this.logger = new common_1.Logger(tag_entity_1.Tag.name);
    }
    async create(createTagDto) {
        if (createTagDto.name === '' || !createTagDto.name)
            throw new common_1.HttpException('Tag is empty', 404);
        if (createTagDto.userId === '' || !createTagDto.userId)
            throw new common_1.HttpException('User is empty', 404);
        try {
            const { userId } = createTagDto;
            const user = await this.userService.findOne(userId);
            if (!user)
                throw new common_1.HttpException('user_not_found', 404);
            const newTag = new tag_entity_1.Tag();
            newTag.name = createTagDto.name;
            newTag.user = user;
            const tag = this.tagRepository.create(newTag);
            this.logger.log('Created successfully');
            this.tagRepository.save(tag);
            return { message: `Tag ${tag.name} created successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findAll(context) {
        try {
            const userId = (0, common_service_1.convertToken)(context);
            const query = this.tagRepository
                .createQueryBuilder('tag')
                .where('tag.deletedAt IS NULL')
                .andWhere('(tag.userId = :userId OR tag.userId IS NULL)', {
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
            const tag = await this.tagRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!tag)
                throw new common_1.HttpException('Tag not found', 404);
            return tag;
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async update(id, updateTagDto) {
        try {
            const tag = await this.tagRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!tag)
                throw new common_1.HttpException('Tag not found', 404);
            tag.name = updateTagDto.name;
            tag.updatedAt = new Date();
            await this.tagRepository.update(id, tag);
            return { message: `Tag ${updateTagDto.name} updated successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async softDelete(id, context) {
        try {
            const userId = (0, common_service_1.convertToken)(context);
            const tag = await this.tagRepository
                .findOne({ where: { id: id, user: { id: userId } } })
                .then((tag) => {
                tag.deletedAt = new Date();
                return this.tagRepository.save(tag);
            });
            return { message: `Tag ${tag.name} deleted successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
};
TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UserService])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map