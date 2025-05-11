import { Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversationContext } from "@/context-api/conversation";

export default function ChatInputBox() {
  const { documents, setShowDocumentUploader } = useConversationContext();
  return (
    <div className="relative">
      <div className="absolute right-0 -top-12 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowDocumentUploader(true)}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload Documents</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <form className="relative">
        <Input
          placeholder="Ask about your documents..."
          className="pr-12 py-6 bg-background/50 backdrop-blur-sm border-primary/20"
          disabled={documents.length === 0}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          disabled={documents.length === 0}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
