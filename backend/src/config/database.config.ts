import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  databaseName: string;
}

export const dbConfigProvider = registerAs(
  'database',
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST as string,
    port: (process.env.DATABASE_PORT || 3306) as number,
    user: process.env.DATABASE_USERNAME as string,
    pass: process.env.DATABASE_PASSWORD as string,
    databaseName: process.env.DATABASE_NAME as string,
  }),
);
