import { Module, forwardRef } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettings } from './app-settings.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettingsRepository } from './app-settings.repository';

@Module({
  providers: [AppSettingsService],
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([AppSettings, AppSettingsRepository]),
  ],
  exports: [TypeOrmModule, AppSettingsService],
})
export class AppSettingsModule {}
