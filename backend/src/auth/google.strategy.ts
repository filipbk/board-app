import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { Provider } from './provider';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH_SECRET'),
      callbackURL: `${configService.get('API_URL')}/auth/google/callback`,
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
