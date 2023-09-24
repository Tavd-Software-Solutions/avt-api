import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const PORT = process.env.PORT;
  const APP_ENV = process.env.APP_ENV;

  const app = await NestFactory.create(AppModule, {
    logger:
      APP_ENV === 'dev' ? ['error', 'warn', 'debug', 'log'] : ['error', 'warn'],
  });

  if (APP_ENV === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('Avt Wallet API')
      .setDescription('The avt wallet API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableCors({ origin: 'http://localhost:3000' });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  logger.debug(`Application is running on: http://localhost:${PORT}`);
  await app.listen(PORT);
}
bootstrap();
