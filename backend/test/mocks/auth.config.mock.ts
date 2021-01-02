import { AuthConfig } from '../../src/config/auth.config';

export const authConfigMock: AuthConfig = {
  google: {
    clientId: 'client-id',
    secret: 'secret',
  },
  jwtSecret: 'jet-secret',
  jwtExpirationTime: 5,
  dashboardUrl: 'http://dashboard-url/',
  apiUrl: 'http://api-url/',
};
