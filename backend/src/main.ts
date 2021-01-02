import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppSettingsService } from './app-settings/app-settings.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Offer board api')
      .setDescription('Offer board application')
      .setVersion('1.0')
      .addTag('offers')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);

  const appSettingsService = app.get(AppSettingsService);
  await appSettingsService.initializeApi();
}

bootstrap();
