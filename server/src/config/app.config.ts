import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  PORT: process.env.PORT ?? 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  APP_NAME: process.env.APP_NAME,
  FRONTEND_APP_URL: process.env.FRONTEND_APP_URL ?? 'http://localhost:5175',
  FILE_UPLOAD_FOLDER: process.env.FILE_UPLOAD_FOLDER ?? 'uploads',
}));
