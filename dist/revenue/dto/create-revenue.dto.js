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
exports.CreateRevenueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payMethod_1 = require("../enum/payMethod");
const typeRevenue_1 = require("../enum/typeRevenue");
const class_validator_1 = require("class-validator");
class CreateRevenueDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Chefe Lopez',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRevenueDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BRL',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRevenueDto.prototype, "coin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 400,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRevenueDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a3b627f3-3db0-4e6d-ba84-7235b8505820',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRevenueDto.prototype, "sourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a48765d9-2c95-4f4e-8c49-1d0b2d53286c',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRevenueDto.prototype, "tagId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: payMethod_1.PayMethod.CREDITCARD,
    }),
    (0, class_validator_1.IsEnum)(payMethod_1.PayMethod),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRevenueDto.prototype, "payMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: new Date(),
    }),
    __metadata("design:type", Date)
], CreateRevenueDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Almocos no Chefe lops',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRevenueDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: typeRevenue_1.typeRevenue.EXPENSE,
    }),
    (0, class_validator_1.IsEnum)(typeRevenue_1.typeRevenue),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRevenueDto.prototype, "typeRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'b4d02f14-2cf9-4ce1-9fa7-c94b07cd9e75',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRevenueDto.prototype, "userId", void 0);
exports.CreateRevenueDto = CreateRevenueDto;
//# sourceMappingURL=create-revenue.dto.js.map