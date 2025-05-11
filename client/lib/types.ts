import { ROLE } from "./enum";

export type Document = {
  id?: string;
  name: string;
  type: string;
  size: number;
  mimeType: string;
  publicUrl?: string;
  uploadingFile?: boolean;
  fileUploadError: string | null;
  tempId?: string;
};

export type Message = {
  content: string;
  messageBy: ROLE;
  id: string;
};

export type Conversation = {
  createdAt: string;
  id: string;
  lastMessage: string | null;
  title: string | null;
  totalDocuments: number;
  updatedAt: string;
  userId: string;
};
