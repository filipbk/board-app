import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from './provider';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get(Provider.GOOGLE)
  @UseGuards(AuthGuard(Provider.GOOGLE))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard(Provider.GOOGLE))
  googleLoginCallback(@Req() req: any, @Res() res: any) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    const dashboardUrl = this.configService.get('DASHBOARD_URL');
    if (jwt) {
      return res.redirect(`${dashboardUrl}/login/success/` + jwt);
    } else {
      return res.redirect(`${dashboardUrl}/login/failure`);
    }
  }
}
