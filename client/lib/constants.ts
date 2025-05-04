import clientSideConfig from "@/config/client.config";

export const API_ENDPOINTS = {
  CONVERSATIONS: {
    LIST: `${clientSideConfig.API_BASE_URL}/conversations/list`,
  },
  DOCUMENTS: {
    LIST: `${clientSideConfig.API_BASE_URL}/documents/list`,
  },
};
