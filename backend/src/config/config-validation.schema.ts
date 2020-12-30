import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .required(),

  DATABASE_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
  GOOGLE_OAUTH_SECRET: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  DASHBOARD_URL: Joi.string().required(),
  API_URL: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.number().required(),
});
