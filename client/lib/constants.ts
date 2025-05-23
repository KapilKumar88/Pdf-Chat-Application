import clientSideConfig from "@/config/client.config";

export const API_ENDPOINTS = {
  CONVERSATIONS: {
    LIST: `${clientSideConfig.API_BASE_URL}/conversations/list`,
    ASK: `${clientSideConfig.API_BASE_URL}/conversations/ask`,
  },
  DOCUMENTS: {
    LIST: `${clientSideConfig.API_BASE_URL}/documents/list`,
  },
  FILE_UPLOAD: {
    UPLOAD: `${clientSideConfig.API_BASE_URL}/file-upload/upload`,
  },
};
