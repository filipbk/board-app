import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { Provider } from './provider';
import { Role } from './role';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

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
      thirdPartyId,
      provider,
      email,
      user.enabled,
      user.roles,
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
    thirdPartyId: string,
    provider: Provider,
    email: string,
    enabled: boolean,
    roles: Role[],
  ): string {
    const payload = {
      thirdPartyId,
      provider,
      email,
      enabled,
      roles,
    };

    const jwtSecret = this.configService.get('JWT_SECRET_KEY');
    console.log({ jwtSecret });
    const jwtExpirationTime = this.configService.get('JWT_EXPIRATION_TIME');

    return sign(payload, jwtSecret, {
      expiresIn: jwtExpirationTime,
    });
  }
}
