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
      DOCUMENTS: {
        PREFIX: '/documents',
        LIST: '/list',
      },
    },
  },
  V2: {
    PREFIX: '/api/v2',
    ENDPOINTS: {
      CONVERSATIONS: {},
      MESSAGES: {},
      DOCUMNETS: {},
    },
  },
});
