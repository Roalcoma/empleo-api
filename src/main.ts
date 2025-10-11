import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitar CORS
  app.setGlobalPrefix('api'); // Establecer prefijo global

  app.enableVersioning({
    type: VersioningType.URI, // URI Versioning
    defaultVersion: '1',
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
