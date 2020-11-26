import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { ActiveGuard } from './guards/active.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    ActiveGuard,
    RolesGuard,
  ],
  imports: [UsersModule],
  exports: [ActiveGuard, RolesGuard],
})
export class AuthModule {}
