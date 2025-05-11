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
