"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  X,
  Download,
  Trash2,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  LoaderPinwheel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useConversationContext } from "@/context-api/conversation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn, formatFileSize, getFileExtensionType } from "@/lib/utils";

export function DocumentDetails() {
  const {
    showConversationDocumentDetails,
    setShowConversationDocumentDetails,
    documents,
    setDocuments,
    setShowDocumentUploader,
  } = useConversationContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <AnimatePresence>
      {showConversationDocumentDetails && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isCollapsed ? "50px" : "355px", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-l bg-background h-full overflow-hidden relative"
        >
          <TooltipProvider>
            {isCollapsed ? (
              <div className="h-full flex flex-col items-center py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mb-4"
                  onClick={() => setIsCollapsed(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-center gap-4">
                  {documents.slice(0, 5).map((doc, index) => (
                    <Tooltip key={`doc-${doc.id ?? doc.tempId}` + index}>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "rounded-full h-8 w-8",
                            !doc.fileUploadError
                              ? "bg-primary/10 text-primary"
                              : "bg-red-100 text-red-600"
                          )}
                          onClick={() => setIsCollapsed(false)}
                        >
                          {doc.uploadingFile ? (
                            <LoaderPinwheel className="h-3 w-3 animate-spin text-primary/60" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{doc.fileUploadError ?? doc.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {documents.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      <Button
                        variant={"ghost"}
                        size="icon"
                        onClick={() => setIsCollapsed(false)}
                      >
                        +{documents.length - 3}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Chat Documents</h3>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsCollapsed(true)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowConversationDocumentDetails(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[calc(100%-57px)] p-4">
                  <div className="space-y-4">
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-2">
                        <span>Documents in this chat ({documents.length})</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {documents.map((doc, index) => (
                          <motion.div
                            key={`doc-${doc.id ?? doc.tempId}` + index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border rounded-lg p-3 bg-card"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded">
                                {doc.uploadingFile ? (
                                  <LoaderPinwheel className="h-3 w-3 animate-spin text-primary/60" />
                                ) : (
                                  <FileText className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {doc.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs uppercase bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                    {getFileExtensionType(doc.type)}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatFileSize(doc.size)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-3">
                              {doc.fileUploadError && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive h-8 gap-1"
                                  onClick={() =>
                                    setDocuments((previousState) =>
                                      previousState.filter((d) =>
                                        d.id
                                          ? d.id !== doc.id
                                          : d.tempId !== doc.tempId
                                      )
                                    )
                                  }
                                >
                                  <X className="h-3.5 w-3.5" />
                                  <p>{doc.fileUploadError}</p>
                                </Button>
                              )}
                              {!doc.fileUploadError && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1"
                                    disabled={!doc.publicUrl}
                                    onClick={() => {
                                      window.open(doc.publicUrl, "_blank");
                                    }}
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1"
                                    disabled={!doc.publicUrl}
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                    <span>Download</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1 text-destructive hover:text-destructive"
                                    disabled={!doc.publicUrl}
                                    onClick={() =>
                                      setDocuments((previousState) =>
                                        previousState.filter((d) =>
                                          d.id
                                            ? d.id !== doc.id
                                            : d.tempId !== doc.tempId
                                        )
                                      )
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Remove</span>
                                  </Button>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => setShowDocumentUploader(true)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Add Documents</span>
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </TooltipProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
