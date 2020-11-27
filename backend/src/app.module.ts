import { Module } from '@nestjs/common';
import Joi = require('@hapi/joi');
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';

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
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
        };
      },
    }),
    ConfigModule.forRoot({
      ignoreEnvFile:
        process.env.IGNORE_ENV_FILE?.toLocaleLowerCase() === 'true',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
