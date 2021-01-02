import { Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthConfig, authConfigProvider } from '../config/auth.config';
import { UsersService } from '../users/users.service';
import { Provider } from './provider';
import { Role } from './role';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpirationTime: number;

  constructor(
    private readonly userService: UsersService,
    @Inject(authConfigProvider.KEY)
    private readonly authConfig: AuthConfig,
  ) {
    this.jwtSecret = this.authConfig.jwtSecret;
    this.jwtExpirationTime = this.authConfig.jwtExpirationTime;
  }

  async loginWithOauth(
    thirdPartyId: string,
    provider: Provider,
    email: string,
  ): Promise<string> {
    let user = await this.userService.findOneByThirdPartyId(
      thirdPartyId,
      provider,
    );

    if (!user) {
      user = await this.userService.registerOAuthUser(
        thirdPartyId,
        provider,
        email,
      );
    }

    return this.generateJwtToken(
      user.id,
      thirdPartyId,
      provider,
      email,
      user.enabled,
      user.role,
      user.firstName,
      user.lastName,
    );
  }

  async verifyAccountActive(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<boolean> {
    const user = await this.userService.findOneByThirdPartyId(
      thirdPartyId,
      provider,
    );

    return user != null && user.enabled;
  }

  private generateJwtToken(
    id: number,
    thirdPartyId: string,
    provider: Provider,
    email: string,
    enabled: boolean,
    role: Role,
    firstName?: string,
    lastName?: string,
  ): string {
    const payload = {
      id,
      thirdPartyId,
      provider,
      email,
      firstName,
      lastName,
      enabled,
      role,
    };

    return sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpirationTime,
    });
  }
}
