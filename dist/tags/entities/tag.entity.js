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
exports.Tag = void 0;
const abstracClass_class_1 = require("../../database/abstractClass/abstracClass.class");
const revenue_entity_1 = require("../../revenue/entities/revenue.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Tag = class Tag extends abstracClass_class_1.AbstractClass {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tags),
    __metadata("design:type", user_entity_1.User)
], Tag.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => revenue_entity_1.Revenue, (revenue) => revenue.tag),
    __metadata("design:type", Array)
], Tag.prototype, "revenues", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map