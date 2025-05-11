"use client";

import { motion } from "framer-motion";
import { Upload, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocumentUploader from "@/components/chat/document-uploader";
import { DocumentDetails } from "@/components/chat/document-details";
import DocumentChips from "@/components/chat/document-chips";
import ChatInputBox from "@/components/chat/chat-input";
import { useConversationContext } from "@/context-api/conversation";
import appConfig from "@/config/app.config";

// Mock data for documents

export default function Dashboard() {
  const { setShowDocumentUploader } = useConversationContext();
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col p-4">
        <DocumentChips />

        <Card className="flex-grow mb-4 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 h-full">
            <ScrollArea className="h-full pr-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-full flex flex-col items-center justify-center text-center p-4"
              >
                <Bot className="h-16 w-16 text-primary/40 mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to {appConfig.APP_NAME}
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Upload your documents and start chatting with AI about their
                  content. I can answer questions, summarize information, and
                  help you understand your documents better.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => setShowDocumentUploader(true)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
              </motion.div>
            </ScrollArea>
          </CardContent>
        </Card>

        <ChatInputBox />
      </div>
      <DocumentDetails />
      <DocumentUploader />
    </div>
  );
}
