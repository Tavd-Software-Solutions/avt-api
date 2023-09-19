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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageDto = exports.PageMetaDto = exports.PageOptionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_1 = require("../enum/order");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const payMethod_1 = require("../enum/payMethod");
class PageOptionsDto {
    constructor() {
        this.order = order_1.Order.ASC;
        this.page = 1;
        this.take = 10;
    }
    get skip() {
        return (this.page - 1) * this.take;
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: order_1.Order, default: order_1.Order.ASC }),
    (0, class_validator_1.IsEnum)(order_1.Order),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 50,
        default: 10,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            name: 'Conta de Luz',
            value: 172,
            tagId: '70d1b7eb-01ca-4f43-bea9-9031e2c889fc',
            payMethod: payMethod_1.PayMethod.MONEY,
        },
    }),
    __metadata("design:type", Object)
], PageOptionsDto.prototype, "where", void 0);
exports.PageOptionsDto = PageOptionsDto;
class PageMetaDto {
    constructor({ pageOptionsDto, itemCount }) {
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "itemCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "pageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PageMetaDto.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PageMetaDto.prototype, "hasNextPage", void 0);
exports.PageMetaDto = PageMetaDto;
class PageDto {
    constructor(data, options) {
        this.data = data;
        this.options = options;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", Array)
], PageDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PageMetaDto }),
    __metadata("design:type", PageMetaDto)
], PageDto.prototype, "options", void 0);
exports.PageDto = PageDto;
//# sourceMappingURL=page.dto.js.map