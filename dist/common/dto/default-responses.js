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
exports.DeletedEntity = exports.UpdatedEntity = exports.CreatedEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatedEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EntityName created successfully',
    }),
    __metadata("design:type", String)
], CreatedEntity.prototype, "message", void 0);
exports.CreatedEntity = CreatedEntity;
class UpdatedEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EntityName updated successfully',
    }),
    __metadata("design:type", String)
], UpdatedEntity.prototype, "message", void 0);
exports.UpdatedEntity = UpdatedEntity;
class DeletedEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EntityName deleted successfully',
    }),
    __metadata("design:type", String)
], DeletedEntity.prototype, "message", void 0);
exports.DeletedEntity = DeletedEntity;
//# sourceMappingURL=default-responses.js.map