import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  google: {
    clientId: string;
    secret: string;
  };
  jwtSecret: string;
  jwtExpirationTime: number;
  dashboardUrl: string;
  apiUrl: string;
}

export const authConfigProvider = registerAs(
  'auth',
  (): AuthConfig => ({
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      secret: process.env.GOOGLE_OAUTH_SECRET as string,
    },
    jwtSecret: process.env.JWT_SECRET_KEY as string,
    jwtExpirationTime: Number.parseInt(
      process.env.JWT_EXPIRATION_TIME as string,
      10,
    ),
    dashboardUrl: process.env.DASHBOARD_URL as string,
    apiUrl: process.env.API_URL as string,
  }),
);
