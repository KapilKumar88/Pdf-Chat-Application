"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileUp, X, File, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConversationContext } from "@/context-api/conversation";
import { useFileUpload } from "@/hooks/use-file-upload";

export default function DocumentUploader() {
  const { showDocumentUploader, setShowDocumentUploader, setDocuments } =
    useConversationContext();
  const { uploadFile, filesUploadStatus } = useFileUpload();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "text/plain" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "text/plain" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = () => {
    uploadFile(files);
    setShowDocumentUploader(false);
  };

  useEffect(() => {
    if (filesUploadStatus?.length > 0) {
      const newDocuments = filesUploadStatus.map((status) => {
        return {
          id: status?.data?.documentId,
          name: status.file.name,
          type: status.file.type,
          size: status.file.size,
          mimeType: status.file.type,
          publicUrl: status.data?.publicUrl,
          uploadingFile: status.loading,
          fileUploadError: status.errorMessage,
          tempId: status.tempId,
        };
      });
      setDocuments(newDocuments);
    }
  }, [filesUploadStatus]);

  return (
    <AnimatePresence>
      {showDocumentUploader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upload Documents</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDocumentUploader(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/20"
                  }`}
                >
                  <FileUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-2 font-medium">
                    Drag and drop your files here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports PDF, TXT, and DOCX files
                  </p>
                  <Button variant="secondary" asChild>
                    <label>
                      Browse Files
                      <input
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.txt,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  </Button>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Selected files:</p>
                    {files.map((file, index) => (
                      <motion.div
                        key={`file-${file.size}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between bg-secondary/50 p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <File className="h-4 w-4 text-primary" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDocumentUploader(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDocumentUpload}
                  disabled={files.length === 0}
                  className="gap-1"
                >
                  <Check className="h-4 w-4" />
                  Upload
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
