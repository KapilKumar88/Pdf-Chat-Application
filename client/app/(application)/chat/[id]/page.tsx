"use client"

import { useState, useRef } from "react"
import { useParams, notFound } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { Send, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocumentDetails } from "@/components/chat/document-details"

// Mock data for chat history
const chatHistory = [
  {
    id: "1",
    title: "Project Research",
    preview: "Analysis of market trends and competitor strategies",
    date: "2 hours ago",
    documents: [
      { id: "1", name: "Market Analysis.pdf", type: "pdf", size: "2.4 MB", date: "2 days ago" },
      { id: "2", name: "Competitor Report.docx", type: "docx", size: "1.8 MB", date: "2 days ago" },
    ],
    messages: [
      { id: "1", role: "user", content: "Can you analyze the market trends in this report?" },
      {
        id: "2",
        role: "assistant",
        content:
          "Based on the Market Analysis.pdf, I can see several key trends emerging in the industry. The report highlights a 15% growth in the digital sector, with particular emphasis on AI and machine learning applications. The competitor analysis shows that major players are investing heavily in R&D, with an average increase of 22% in R&D budgets compared to last year.",
      },
      { id: "3", role: "user", content: "What are the main competitors doing differently from us?" },
      {
        id: "4",
        role: "assistant",
        content:
          "According to the Competitor Report.docx, your main competitors are focusing on three key areas that differ from your current strategy:\n\n1. Customer Experience: They're investing in personalized user journeys and AI-driven customer service.\n\n2. Product Innovation: Faster release cycles (2-3 weeks vs. your 6-week cycle) and more feature experimentation.\n\n3. Market Expansion: They're aggressively entering emerging markets in Southeast Asia and Latin America, while your focus has been primarily on established markets.",
      },
    ],
  },
  {
    id: "2",
    title: "Meeting Notes",
    preview: "Notes from the quarterly planning meeting",
    date: "Yesterday",
    documents: [{ id: "3", name: "Q2 Planning.pdf", type: "pdf", size: "3.2 MB", date: "3 days ago" }],
    messages: [
      { id: "1", role: "user", content: "Summarize the key points from our quarterly planning meeting." },
      {
        id: "2",
        role: "assistant",
        content:
          "Based on the Q2 Planning.pdf, the key points from your quarterly planning meeting are:\n\n1. Revenue targets have been increased by 18% for Q2 based on strong Q1 performance\n\n2. Three new product features are scheduled for release: enhanced analytics dashboard, mobile app redesign, and API improvements\n\n3. The marketing team will focus on the upcoming industry conference in June as a major lead generation opportunity\n\n4. Customer success team is expanding with 5 new hires to improve response times\n\n5. Budget adjustments include a 15% increase for the engineering department and a 10% increase for marketing initiatives",
      },
    ],
  },
]

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string
  const [showDocumentDetails, setShowDocumentDetails] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chatHistory.find((chat) => chat.id === chatId)

  if (!currentChat) {
    notFound()
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold">{currentChat.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>{currentChat.documents.length} documents</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 rounded-full"
              onClick={() => setShowDocumentDetails(!showDocumentDetails)}
            >
              <span>View Documents</span>
            </Button>
          </div>
        </div>

        <Card className="flex-grow mb-4 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 h-full">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4 py-4">
                <AnimatePresence>

                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <form className="relative">
          <Input
            placeholder="Ask a follow-up question..."
            className="pr-12 py-6 bg-background/50 backdrop-blur-sm border-primary/20"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Document details panel */}
      <DocumentDetails
        isOpen={showDocumentDetails}
        onClose={() => setShowDocumentDetails(false)}
        documents={currentChat.documents}
      />
    </div>
  )
}
