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
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { API_ENDPOINTS } from "@/lib/constants";
import { v4 as uuidv4 } from "uuid";
import { ROLE } from "@/lib/enum";

export default function ChatInputBox() {
  const { getToken } = useAuth();
  const { documents, setShowDocumentUploader, setMessageList } =
    useConversationContext();
  const [userQuery, setUserQuery] = useState<string>("");

  const askQuery = async () => {
    const token = await getToken();
    setMessageList((previousState) => {
      return [
        ...previousState,
        {
          id: uuidv4(),
          messageBy: ROLE.USER,
          content: userQuery,
        },
      ];
    });
    const response = await fetch(API_ENDPOINTS.CONVERSATIONS.ASK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: userQuery,
        documentIds: documents.map((doc) => doc.id),
      }),
    });
    const jsonResponse = await response.json();
    setMessageList((previousState) => {
      return [
        ...previousState,
        {
          id: jsonResponse.messageId,
          messageBy: ROLE.BOT,
          content: jsonResponse.botMessage,
        },
      ];
    });
  };

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
      <div className="relative">
        <Input
          placeholder="Ask about your documents..."
          className="pr-12 py-6 bg-background/50 backdrop-blur-sm border-primary/20"
          disabled={documents.length === 0}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              askQuery();
              if (userQuery) {
                setUserQuery("");
              }
            }
          }}
        />
        <Button
          type="button"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          disabled={documents.length === 0 || userQuery?.length === 0}
          onClick={() => askQuery()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
