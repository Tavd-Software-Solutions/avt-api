"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueModule = void 0;
const common_1 = require("@nestjs/common");
const revenue_service_1 = require("./services/revenue.service");
const revenue_controller_1 = require("./revenue.controller");
const typeorm_1 = require("@nestjs/typeorm");
const revenue_entity_1 = require("./entities/revenue.entity");
const users_module_1 = require("../users/users.module");
const tags_module_1 = require("../tags/tags.module");
const sources_module_1 = require("../sources/sources.module");
let RevenueModule = class RevenueModule {
};
RevenueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([revenue_entity_1.Revenue]),
            users_module_1.UsersModule,
            tags_module_1.TagsModule,
            sources_module_1.SourcesModule,
        ],
        controllers: [revenue_controller_1.RevenueController],
        providers: [revenue_service_1.RevenueService],
    })
], RevenueModule);
exports.RevenueModule = RevenueModule;
//# sourceMappingURL=revenue.module.js.map