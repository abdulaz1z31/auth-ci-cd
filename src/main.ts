import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configKeys } from './config/index.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configKeys.app.port ?? 4200);
}
bootstrap();
