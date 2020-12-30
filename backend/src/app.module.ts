import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { AppController } from './app.controller';
import { OptimisticLockingSubscriber } from './app.optimistic-locking.subscriber';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { authConfigProvider } from './config/auth.config';
import { configValidationSchema } from './config/config-validation.schema';
import { DatabaseConfig, dbConfigProvider } from './config/database.config';
import { OfferModule } from './offer/offer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfigProvider, authConfigProvider],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [dbConfigProvider.KEY],
      useFactory: (dbConfig: DatabaseConfig) => {
        return {
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.pass,
          database: dbConfig.databaseName,
          autoLoadEntities: true,
          subscribers: [OptimisticLockingSubscriber],
          synchronize: true,
        };
      },
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
