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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const common_service_1 = require("../../common/services/common.service");
const bcrypt_1 = require("bcrypt");
const resend_1 = require("resend");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(user_entity_1.User.name);
        this.resend = new resend_1.Resend(process.env.RESEND_SECRET);
    }
    async create(createUserDto) {
        try {
            const { password } = createUserDto;
            const hashedPassword = await this.hashPassword(password);
            createUserDto.password = hashedPassword;
            const user = this.usersRepository.create(createUserDto);
            this.usersRepository.save(user);
            this.logger.debug('User created successfully');
            return { message: `User ${user.name} created successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findById(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!user)
                throw new common_1.HttpException('user_not_found', 404);
            return {
                name: user.name,
                email: user.email,
                login: user.login,
                coin: user.coin,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findOne(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!user)
                throw new common_1.HttpException('user_not_found', 404);
            return user;
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async findByLogin(login) {
        try {
            const user = await this.usersRepository.findOneBy({ login });
            if (!user)
                throw new common_1.HttpException('user_not_found', 404);
            return user;
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (!user)
                throw new common_1.HttpException('user_not_found', 404);
            user.name = updateUserDto.name;
            user.email = updateUserDto.email;
            user.login = updateUserDto.login;
            user.password = updateUserDto.password;
            user.updatedAt = new Date();
            await this.usersRepository.update(id, user);
            this.logger.debug('User updated successfully');
            return {
                name: user.name,
                email: user.email,
                login: user.login,
                coin: user.coin,
            };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async softDelete(id) {
        try {
            const user = await this.usersRepository.findOneBy({ id }).then((user) => {
                user.deletedAt = new Date();
                return this.usersRepository.save(user);
            });
            return { message: `User ${user.name} deleted successfully` };
        }
        catch (e) {
            (0, common_service_1.handleErrors)(e.message, e.code);
        }
    }
    async getRecoverCode(email) {
        const recoverCode = this.generateCode();
        const user = await this.usersRepository.findOne({
            where: {
                email,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        if (!user)
            throw new common_1.HttpException('user_not_found', 404);
        try {
            await this.resend.emails
                .send({
                from: 'onboarding@resend.dev',
                to: [email],
                subject: 'Recuperar senha:',
                html: `
            <h3>Este é o seu código para recuperação de senha:</h3>
            <p>${recoverCode}</p>
          `,
            })
                .then((response) => {
                this.logger.log(`Email sent successfully: ${response.id}`);
            })
                .catch((error) => {
                throw new common_1.HttpException('error_recover_password', 500);
            });
        }
        catch (e) {
            this.logger.error('Error durring sending email');
        }
        user.recoverCode = recoverCode;
        this.usersRepository.save(user);
    }
    async validateRecoverCode(recoverCode) {
        const user = await this.usersRepository.findOne({
            where: {
                recoverCode,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        if (!user)
            throw new common_1.HttpException('user_not_found', 404);
        user.recoverCode = null;
        this.usersRepository.save(user);
        const payload = { username: user.login, sub: user.id, coin: user.coin };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: process.env.SECRET,
            }),
        };
    }
    async recoverPassword(recover, request) {
        const { newPassword } = recover;
        const userId = (0, common_service_1.convertToken)(request);
        const user = await this.usersRepository.findOne({
            where: {
                id: userId,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        if (!user)
            throw new common_1.HttpException('user_not_found', 404);
        const newHashedPassword = await this.hashPassword(newPassword);
        if (user.password === newHashedPassword) {
            throw new common_1.HttpException('user_new_password_equal_old_password', 500);
        }
        user.password = newHashedPassword;
        await this.usersRepository.save(user);
        return {
            message: 'Password updated successfully',
        };
    }
    generateCode() {
        return (Math.random() + 1).toString(36).substring(5);
    }
    async hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await (0, bcrypt_1.hash)(password, saltRounds);
        return hashedPassword;
    }
    async isPasswordsEqual(password, hashedPassword) {
        return await (0, bcrypt_1.compare)(password, hashedPassword);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map