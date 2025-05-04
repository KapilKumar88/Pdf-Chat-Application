"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Send, Bot, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DocumentUploader from "@/components/chat/document-uploader"
import { DocumentDetails } from "@/components/chat/document-details"
import clientSideConfig from "@/config/client.config"

// Mock data for documents
const mockDocuments = [
  { id: "1", name: "Market Analysis.pdf", type: "pdf", size: "2.4 MB", date: "2 days ago" },
  { id: "2", name: "Competitor Report.docx", type: "docx", size: "1.8 MB", date: "2 days ago" },
  { id: "3", name: "Q2 Planning.pdf", type: "pdf", size: "3.2 MB", date: "3 days ago" },
]

export default function Dashboard() {
  const [documents, setDocuments] = useState<File[]>([])
  const [showUploader, setShowUploader] = useState(false)
  const [showDocumentDetails, setShowDocumentDetails] = useState(false)

  const handleDocumentUpload = (files: File[]) => {
    setDocuments((prev) => [...prev, ...files])
    setShowUploader(false)
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col p-4">
        {documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                <FileText className="h-3 w-3" />
                <span className="truncate max-w-[150px]">{doc.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full"
                  onClick={() => removeDocument(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 rounded-full"
              onClick={() => setShowDocumentDetails(!showDocumentDetails)}
            >
              <span>View All</span>
            </Button>
          </motion.div>
        )}

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
                <h2 className="text-2xl font-bold mb-2">Welcome to {clientSideConfig.APP_NAME}</h2>
                <p className="text-muted-foreground max-w-md">
                  Upload your documents and start chatting with AI about their content. I can answer questions,
                  summarize information, and help you understand your documents better.
                </p>
                <Button className="mt-6" onClick={() => setShowUploader(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
              </motion.div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute right-0 -top-12 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowUploader(true)}>
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
      </div>

      <DocumentDetails
        isOpen={showDocumentDetails}
        onClose={() => setShowDocumentDetails(false)}
        documents={mockDocuments}
      />

      <AnimatePresence>
        {showUploader && <DocumentUploader onUpload={handleDocumentUpload} onClose={() => setShowUploader(false)} />}
      </AnimatePresence>
    </div>
  )
}
