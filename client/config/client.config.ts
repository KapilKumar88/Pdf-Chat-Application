import "client-only";
type ClientSideConfig = {
  APP_NAME: string;
  NODE_ENV: string;
  API_BASE_URL: string;
};

const clientSideConfig: ClientSideConfig = Object.freeze({
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
}) as ClientSideConfig;

export default clientSideConfig;
