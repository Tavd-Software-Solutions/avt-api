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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./services/users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const swagger_1 = require("@nestjs/swagger");
const default_responses_1 = require("../common/dto/default-responses");
const get_user_dto_1 = require("./dto/get-user.dto");
const get_recover_code_dto_1 = require("./dto/get-recover-code.dto");
const validate_recover_code_1 = require("./dto/validate-recover-code");
const recover_password_1 = require("./dto/recover-password");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async findOne(id) {
        return await this.usersService.findById(id);
    }
    async update(id, updateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }
    async delete(id) {
        return await this.usersService.softDelete(id);
    }
    async getRecoverCode(recoverPassword) {
        return await this.usersService.getRecoverCode(recoverPassword.email);
    }
    async validateRecoverCode({ recoverCode }) {
        return await this.usersService.validateRecoverCode(recoverCode);
    }
    async recoverPassword(recover, request) {
        return await this.usersService.recoverPassword(recover, request);
    }
};
__decorate([
    (0, auth_decorators_1.Public)(),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({ status: 201, type: default_responses_1.CreatedEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: get_user_dto_1.GetUserResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: update_user_dto_1.UpdateUserResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: default_responses_1.DeletedEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, auth_decorators_1.Public)(),
    (0, common_1.Post)('get-recover-code'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_recover_code_dto_1.GetRecoverCodeDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getRecoverCode", null);
__decorate([
    (0, auth_decorators_1.Public)(),
    (0, common_1.Post)('validate-recover-code'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_recover_code_1.ValidateRecoverCodeDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "validateRecoverCode", null);
__decorate([
    (0, common_1.Post)('recover-password'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recover_password_1.RecoverPasswordDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "recoverPassword", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map