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
exports.SourcesController = void 0;
const common_1 = require("@nestjs/common");
const sources_service_1 = require("./services/sources.service");
const create_source_dto_1 = require("./dto/create-source.dto");
const update_source_dto_1 = require("./dto/update-source.dto");
const swagger_1 = require("@nestjs/swagger");
const source_entity_1 = require("./entities/source.entity");
const default_responses_1 = require("../common/dto/default-responses");
let SourcesController = class SourcesController {
    constructor(sourcesService) {
        this.sourcesService = sourcesService;
    }
    create(createSourceDto) {
        return this.sourcesService.create(createSourceDto);
    }
    findAll(request) {
        return this.sourcesService.findAll(request);
    }
    findOne(id) {
        return this.sourcesService.findOne(id);
    }
    update(id, updateSourceDto) {
        return this.sourcesService.update(id, updateSourceDto);
    }
    remove(id, request) {
        return this.sourcesService.softDelete(id, request);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_source_dto_1.CreateSourceDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_source_dto_1.CreateSourceDto]),
    __metadata("design:returntype", void 0)
], SourcesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list-all'),
    (0, swagger_1.ApiResponse)({ status: 200, type: [source_entity_1.Source] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: source_entity_1.Source }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.UpdatedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_source_dto_1.UpdateSourceDto]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.DeletedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "remove", null);
SourcesController = __decorate([
    (0, swagger_1.ApiTags)('sources'),
    (0, common_1.Controller)('sources'),
    __metadata("design:paramtypes", [sources_service_1.SourcesService])
], SourcesController);
exports.SourcesController = SourcesController;
//# sourceMappingURL=sources.controller.js.map