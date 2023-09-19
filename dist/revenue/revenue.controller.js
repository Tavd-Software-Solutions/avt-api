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
exports.RevenueController = void 0;
const common_1 = require("@nestjs/common");
const revenue_service_1 = require("./services/revenue.service");
const create_revenue_dto_1 = require("./dto/create-revenue.dto");
const update_revenue_dto_1 = require("./dto/update-revenue.dto");
const page_dto_1 = require("./dto/page.dto");
const swagger_1 = require("@nestjs/swagger");
const revenue_entity_1 = require("./entities/revenue.entity");
const default_responses_1 = require("../common/dto/default-responses");
let RevenueController = class RevenueController {
    constructor(revenueService) {
        this.revenueService = revenueService;
    }
    create(createRevenueDto) {
        return this.revenueService.create(createRevenueDto);
    }
    findAll(pageOptionsDto, request) {
        return this.revenueService.findAll(pageOptionsDto, request);
    }
    findOne(id) {
        return this.revenueService.findOne(id);
    }
    getAmount(request) {
        return this.revenueService.getAmount(request);
    }
    getPieChart(request) {
        return this.revenueService.getPieChart(request);
    }
    getStackedChart(request) {
        return this.revenueService.getStackedChart(request);
    }
    getBarChart(pageOptionsDto, request) {
        return this.revenueService.getBarChart(pageOptionsDto, request);
    }
    update(id, updateRevenueDto) {
        return this.revenueService.update(id, updateRevenueDto);
    }
    remove(id) {
        return this.revenueService.softDelete(id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({ status: 201, type: default_responses_1.CreatedEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_revenue_dto_1.CreateRevenueDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('list-all'),
    (0, swagger_1.ApiResponse)({ status: 200, type: page_dto_1.PageDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: revenue_entity_1.Revenue }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('amount'),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getAmount", null);
__decorate([
    (0, common_1.Get)('pie-chart'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getPieChart", null);
__decorate([
    (0, common_1.Get)('stacked-chart'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getStackedChart", null);
__decorate([
    (0, common_1.Post)('bar-chart'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getBarChart", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.UpdatedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_revenue_dto_1.UpdateRevenueDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.DeletedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "remove", null);
RevenueController = __decorate([
    (0, swagger_1.ApiTags)('revenues'),
    (0, common_1.Controller)('revenues'),
    __metadata("design:paramtypes", [revenue_service_1.RevenueService])
], RevenueController);
exports.RevenueController = RevenueController;
//# sourceMappingURL=revenue.controller.js.map