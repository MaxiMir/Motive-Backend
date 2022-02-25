import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // validation for all endpoints
  app.useGlobalFilters(new AllExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3007', credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Motiv Backend')
    .setDescription('The app API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(6969);
}

bootstrap();
