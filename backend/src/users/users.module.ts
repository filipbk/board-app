import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AppSettingsModule } from '../app-settings/app-settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    forwardRef(() => AppSettingsModule),
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
