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
exports.Revenue = void 0;
const abstracClass_class_1 = require("../../database/abstractClass/abstracClass.class");
const source_entity_1 = require("../../sources/entities/source.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const payMethod_1 = require("../enum/payMethod");
const typeRevenue_1 = require("../enum/typeRevenue");
let Revenue = class Revenue extends abstracClass_class_1.AbstractClass {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Revenue.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Revenue.prototype, "coin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Revenue.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Revenue.prototype, "payMethod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Revenue.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Revenue.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Revenue.prototype, "typeRevenue", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.revenues),
    __metadata("design:type", user_entity_1.User)
], Revenue.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => source_entity_1.Source, (source) => source.revenues),
    __metadata("design:type", source_entity_1.Source)
], Revenue.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, (tag) => tag.revenues),
    __metadata("design:type", tag_entity_1.Tag)
], Revenue.prototype, "tag", void 0);
Revenue = __decorate([
    (0, typeorm_1.Entity)()
], Revenue);
exports.Revenue = Revenue;
//# sourceMappingURL=revenue.entity.js.map