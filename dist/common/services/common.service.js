"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToken = exports.handleErrors = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const handleErrors = (message, code) => {
    const logger = new common_1.Logger();
    logger.error(message);
    throw new common_1.HttpException(message, code);
};
exports.handleErrors = handleErrors;
const convertToken = (context) => {
    const authHeader = context.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken.sub;
};
exports.convertToken = convertToken;
//# sourceMappingURL=common.service.js.map