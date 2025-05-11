import { motion } from "framer-motion";
import { FileText, LoaderPinwheel, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversationContext } from "@/context-api/conversation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

export default function DocumentChips() {
  const { documents, setShowConversationDocumentDetails, setDocuments } =
    useConversationContext();

  if (documents?.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="flex flex-wrap gap-2 mb-4"
    >
      <TooltipProvider>
        {documents.slice(0, 4).map((doc, index) => (
          <Tooltip key={`doc-${doc.id ?? doc.tempId}` + index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-sm",
                !doc.fileUploadError
                  ? "bg-secondary/50  text-secondary-foreground"
                  : "border border-red-300 bg-red-100 text-red-600"
              )}
            >
              <FileText className="h-3 w-3" />
              <TooltipTrigger>
                <span className="truncate max-w-[150px]">{doc.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full"
                  disabled={doc.uploadingFile}
                  onClick={() =>
                    setDocuments((previousState) =>
                      previousState.filter((d) =>
                        d.id ? d.id !== doc.id : d.tempId !== doc.tempId
                      )
                    )
                  }
                >
                  {doc.uploadingFile ? (
                    <LoaderPinwheel className="h-3 w-3 animate-spin text-primary/60" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{doc.fileUploadError ?? doc.name}</p>
              </TooltipContent>
            </motion.div>
          </Tooltip>
        ))}
      </TooltipProvider>
      {documents?.length > 4 && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-3 rounded-full"
          onClick={() => setShowConversationDocumentDetails(true)}
        >
          <span>
            View All{documents?.length > 4 && ` (+${documents?.length - 4})`}
          </span>
        </Button>
      )}
    </motion.div>
  );
}
