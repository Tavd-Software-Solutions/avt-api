"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const default_seeder_seeder_1 = require("./database/seeds/default-seeder.seeder");
(0, dotenv_1.config)();
const basicAuth = require("express-basic-auth");
async function bootstrap() {
    const logger = new common_1.Logger();
    const PORT = process.env.PORT;
    const APP_ENV = process.env.APP_ENV;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: APP_ENV === 'dev' ? ['error', 'warn', 'debug', 'log'] : ['error', 'warn'],
    });
    app.use(['/docs', '/docs-json'], basicAuth({
        challenge: true,
        users: {
            ['root']: 'root',
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Avt Wallet API')
        .setDescription('The avt wallet API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.enableCors({ origin: 'http://localhost:3000' });
    const connection = app.get(typeorm_1.Connection);
    await connection.synchronize();
    await default_seeder_seeder_1.default.run(connection);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    logger.debug(`Application is running on: http://localhost:${PORT}`);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map