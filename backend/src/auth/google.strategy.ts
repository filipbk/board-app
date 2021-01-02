import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthConfig, authConfigProvider } from '../config/auth.config';
import { AuthService } from './auth.service';
import { Provider } from './provider';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfigProvider.KEY)
    readonly authConfig: AuthConfig,
  ) {
    super({
      clientID: authConfig.google.clientId,
      clientSecret: authConfig.google.secret,
      callbackURL: `${authConfig.apiUrl}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      const jwt: string = await this.authService.loginWithOauth(
        profile.id,
        Provider.GOOGLE,
        profile.emails[0].value,
      );

      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
