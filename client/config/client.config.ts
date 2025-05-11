import "client-only";
type ClientSideConfig = {
  NODE_ENV: string;
  API_BASE_URL: string;
};

const clientSideConfig: ClientSideConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
}) as ClientSideConfig;

export default clientSideConfig;
