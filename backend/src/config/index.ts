import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL ?? '',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
  accessTokenExpiresIn: '15m',
  refreshTokenExpiresIn: '7d',
  emailFrom: process.env.EMAIL_FROM ?? 'no-reply@example.com',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  paypalClientId: process.env.PAYPAL_CLIENT_ID ?? '',
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET ?? '',
  paypalMode: process.env.PAYPAL_MODE ?? 'sandbox',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
};

export default config;
