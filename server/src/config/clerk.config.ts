import { registerAs } from '@nestjs/config';

export default registerAs('clerk', () => ({
  CLERK_WEBHOOK_SIGNING_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_JWKS_PUBLIC_KEY: process.env.CLERK_JWKS_PUBLIC_KEY,
}));
