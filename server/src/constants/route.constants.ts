export const API_ENDPOINTS = Object.freeze({
  V1: {
    PREFIX: '/api/v1',
    VERSION: 'v1',
    ENDPOINTS: {
      CONVERSATIONS: {
        PREFIX: '/conversations',
        LIST: '/list',
        CREATE: '/create',
        UPDATE: '/update',
        DELETE: '/delete',
      },
      MESSAGES: {
        LIST: '/messages-list',
        DELETE: '/messages-delete',
      },
      DOCUMENTS_MANAGER: {
        PREFIX: '/documents',
        LIST: '/list',
      },
      FILE_UPLOAD: {
        PREFIX: '/file-upload',
        UPLOAD: '/upload',
      },
    },
  },
});
