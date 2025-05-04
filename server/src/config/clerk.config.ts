import { registerAs } from '@nestjs/config';

export default registerAs('clerk', () => ({
  CLERK_WEBHOOK_SIGNING_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
  CLERK_JWT_KEY: process.env.CLERK_JWT_KEY,
}));
