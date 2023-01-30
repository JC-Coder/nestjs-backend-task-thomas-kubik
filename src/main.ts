import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from './common/filters/filter';
import { ENVIRONMENT } from './config/environment';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * cors configuration
   */
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  /**
   * Filters
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * morgan logger for development
   */
  if (process.env.APP_IN_DEVELOPMENT == 'true') {
    app.use(morgan('combined'));
  }

  /**
   * prefix
   */
  app.setGlobalPrefix('/api/v1');

  /**
   * swagger module config
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog api')
    .setDescription('Blog api built using nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ENVIRONMENT.APP.PORT || 3000);
}
bootstrap();
