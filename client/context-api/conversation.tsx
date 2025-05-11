"use client";

import { Document } from "@/lib/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type ConversationContextType = {
  documents: Array<Document>;
  setDocuments: Dispatch<SetStateAction<Array<Document>>>;
  showConversationDocumentDetails: boolean;
  setShowConversationDocumentDetails: Dispatch<SetStateAction<boolean>>;
  showDocumentUploader: boolean;
  setShowDocumentUploader: Dispatch<SetStateAction<boolean>>;
  tempFiles: Array<File>;
  setTempFiles: Dispatch<SetStateAction<Array<File>>>;
};

const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tempFiles, setTempFiles] = useState<Array<File>>([]);
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [showConversationDocumentDetails, setShowConversationDocumentDetails] =
    useState<boolean>(false); // show the documents list in the sidebar
  const [showDocumentUploader, setShowDocumentUploader] =
    useState<boolean>(false); // show the document uploader to upload new files

  const value = useMemo(
    () => ({
      documents,
      setDocuments,
      showConversationDocumentDetails,
      setShowConversationDocumentDetails,
      showDocumentUploader,
      setShowDocumentUploader,
      tempFiles,
      setTempFiles,
    }),
    [
      documents,
      setDocuments,
      showConversationDocumentDetails,
      setShowConversationDocumentDetails,
      showDocumentUploader,
      setShowDocumentUploader,
      setTempFiles,
      tempFiles,
    ]
  );

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversationContext must be used within an ConversationProvider"
    );
  }
  return context;
};
