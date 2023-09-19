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
exports.TagsController = void 0;
const common_1 = require("@nestjs/common");
const tags_service_1 = require("./services/tags.service");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const update_tag_dto_1 = require("./dto/update-tag.dto");
const swagger_1 = require("@nestjs/swagger");
const default_responses_1 = require("../common/dto/default-responses");
const tag_entity_1 = require("./entities/tag.entity");
let TagsController = class TagsController {
    constructor(tagsService) {
        this.tagsService = tagsService;
    }
    create(createTagDto) {
        return this.tagsService.create(createTagDto);
    }
    findAll(request) {
        return this.tagsService.findAll(request);
    }
    findOne(id) {
        return this.tagsService.findOne(id);
    }
    update(id, updateTagDto) {
        return this.tagsService.update(id, updateTagDto);
    }
    remove(id, request) {
        return this.tagsService.softDelete(id, request);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({ status: 201, type: default_responses_1.CreatedEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateTagDto]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list-all'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [tag_entity_1.Tag] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: tag_entity_1.Tag }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.UpdatedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tag_dto_1.UpdateTagDto]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.CreatedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "remove", null);
TagsController = __decorate([
    (0, swagger_1.ApiTags)('tags'),
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsController);
exports.TagsController = TagsController;
//# sourceMappingURL=tags.controller.js.map