import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(fileSize: number): string {
  return fileSize < 1024 * 1024
    ? `${(fileSize / 1024).toFixed(2)} MB`
    : `${(fileSize / (1024 * 1024)).toFixed(2)} GB`;
}

export function getFileExtensionType(mimeType: string): string {
  switch (mimeType) {
    case "application/pdf":
      return "PDF";
    case "application/msword":
      return "DOC";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "DOCX";
    case "application/vnd.ms-excel":
      return "XLS";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "XLSX";
    case "text/csv":
      return "CSV";
    case "text/plain":
      return "TXT";
    case "image/jpeg":
      return "JPG";
    case "image/png":
      return "PNG";
    case "image/gif":
      return "GIF";
    default:
      return "Unknown";
  }
}
