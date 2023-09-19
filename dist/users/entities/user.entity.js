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
exports.User = void 0;
const abstracClass_class_1 = require("../../database/abstractClass/abstracClass.class");
const revenue_entity_1 = require("../../revenue/entities/revenue.entity");
const source_entity_1 = require("../../sources/entities/source.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
const typeorm_1 = require("typeorm");
let User = class User extends abstracClass_class_1.AbstractClass {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "coin", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => revenue_entity_1.Revenue, (revenue) => revenue.user),
    __metadata("design:type", Array)
], User.prototype, "revenues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tag_entity_1.Tag, (tag) => tag.user),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => source_entity_1.Source, (source) => source.user),
    __metadata("design:type", Array)
], User.prototype, "sources", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "recoverCode", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map