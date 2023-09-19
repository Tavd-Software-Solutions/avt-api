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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./dto/auth.dto");
const auth_service_1 = require("./services/auth.service");
const swagger_1 = require("@nestjs/swagger");
const auth_decorators_1 = require("./decorators/auth.decorators");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(authDto) {
        return await this.authService.login(authDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Authentication' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Authenticate the user when login',
        type: auth_dto_1.AuthResponse,
    }),
    (0, common_1.Post)('login'),
    (0, auth_decorators_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map