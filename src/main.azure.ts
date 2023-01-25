import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: 'http://localhost:4000' },
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.init();
  return app;
}
