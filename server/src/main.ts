import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Use JSON parser for all other routes
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(configService.get('app.PORT') ?? 3000);
}
bootstrap();
