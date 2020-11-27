import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): DatabaseSettings => ({
    host: process.env.DATABASE_HOST as string,
    port: (process.env.DATABASE_PORT || 3306) as number,
    user: process.env.DATABASE_USERNAME as string,
    pass: process.env.DATABASE_PASSWORD as string,
    databaseName: process.env.DATABASE_NAME as string,
  }),
);
