"use client"

import { motion } from "framer-motion"
import { Bot, } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-br from-background to-background/80">
      <div className="z-10 w-full max-w-5xl flex flex-col h-[90vh]">
        <Card className="flex-grow mb-4 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col items-center justify-center text-center p-4"
            >
              <Bot className="h-16 w-16 text-primary/40 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Welcome to DocuChat AI</h2>
              <p className="text-muted-foreground max-w-md">
                Upload your documents and start chatting with AI about their content. I can answer questions,
                summarize information, and help you understand your documents better.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
