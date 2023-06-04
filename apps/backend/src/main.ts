import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://advanced-todo-app-ruddy.vercel.app',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/}`);
}

bootstrap();
