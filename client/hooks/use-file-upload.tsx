import { API_ENDPOINTS } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type FileUploadState = {
  success: boolean;
  loading: boolean;
  errorMessage: string | null;
  data?: {
    documentId: string;
    publicUrl: string;
  };
  tempId: string;
  file: File;
};

export const useFileUpload = () => {
  const { getToken } = useAuth();
  const [filesUploadStatus, setFilesUploadStatus] = useState<
    Array<FileUploadState>
  >([]);

  const reset = () => setFilesUploadStatus([]);

  const updateFileState = (
    tempId: string,
    updates: Partial<FileUploadState>
  ) => {
    setFilesUploadStatus((prev) =>
      prev.map((f) => (f.tempId === tempId ? { ...f, ...updates } : f))
    );
  };

  const uploadFile = async (files: File[]) => {
    const token = await getToken();
    const initialState = files.map((file) => ({
      success: false,
      loading: true,
      errorMessage: null,
      data: undefined,
      file,
      tempId: uuidv4(),
    }));
    setFilesUploadStatus(initialState);

    initialState.forEach(async ({ file, tempId }) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(API_ENDPOINTS.FILE_UPLOAD.UPLOAD, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errText = await response.json();
          throw new Error(errText?.message ?? "Upload failed");
        }

        const jsonResponse = await response.json();
        updateFileState(tempId, {
          success: true,
          data: {
            documentId: jsonResponse.documentId,
            publicUrl: jsonResponse.publicUrl,
          },
          loading: false,
        });
      } catch (err: any) {
        updateFileState(tempId, {
          success: false,
          errorMessage: err.message ?? "Upload failed",
          loading: false,
        });
      }
    });
  };

  return { uploadFile, filesUploadStatus, reset };
};
