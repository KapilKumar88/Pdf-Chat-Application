type AppConfig = {
  APP_NAME: string;
  MAX_FILE_UPLOAD_ALLOWED: number;
  MAX_FILE_SIZE: number;
};

const appConfig: AppConfig = Object.freeze({
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "TalkToDoc",
  MAX_FILE_UPLOAD_ALLOWED: 5,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
}) as AppConfig;

export default appConfig;
