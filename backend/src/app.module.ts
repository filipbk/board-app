import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { AppController } from './app.controller';
import { OptimisticLockingSubscriber } from './app.optimistic-locking.subscriber';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import databaseConfig from './config/database.config';
import { OfferModule } from './offer/offer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbSettings = configService.get('database') as DatabaseSettings;
        return {
          type: 'mysql',
          host: dbSettings.host,
          port: dbSettings.port,
          username: dbSettings.user,
          password: dbSettings.pass,
          database: dbSettings.databaseName,
          autoLoadEntities: true,
          subscribers: [OptimisticLockingSubscriber],
          synchronize: true,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: Joi.object({
        DATABASE_PORT: Joi.number().default(3306),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_SECRET: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        DASHBOARD_URL: Joi.string().required(),
        API_URL: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().default(7200),
      }),
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    OfferModule,
    MulterModule.register({
      dest: './files',
    }),
    CommentModule,
    AppSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
