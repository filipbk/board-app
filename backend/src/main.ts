import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppSettingsService } from './app-settings/app-settings.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
    }),
  );

  await app.listen(3000);

  const appSettingsService = app.get(AppSettingsService);
  await appSettingsService.initializeApi();
}

bootstrap();
