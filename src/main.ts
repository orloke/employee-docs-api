import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const version = process.env.VERSION ?? 'v1';

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/${version}`);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Employee Docs API')
    .setDescription('Employee Docs API')
    .setVersion(version)
    .setExternalDoc('Employee Docs API Docs', `/api/${version}/docs-json`)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    }, 'jwt-auth')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(`api/${version}/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port, async () => Logger.log(`Listening on port ${port}`));
}

bootstrap();
