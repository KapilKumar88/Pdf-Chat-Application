"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: any
  isLast: boolean
}

export default function ChatMessage({ message, isLast }: Readonly<ChatMessageProps>) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(isLast && message.role === "assistant")

  useEffect(() => {
    if (isLast && message.role === "assistant") {
      setIsTyping(true)
      let i = 0
      const content = message.content

      const interval = setInterval(() => {
        setDisplayedText(content.substring(0, i))
        i++
        if (i > content.length) {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, 15) // Adjust speed as needed

      return () => clearInterval(interval)
    } else {
      setDisplayedText(message.content)
    }
  }, [isLast, message.content, message.role])

  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary/50 backdrop-blur-sm",
        )}
      >
        <div className="relative">
          {isUser ? (
            displayedText
          ) : (
            <>
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="inline-block ml-1 w-2 h-4 bg-primary/40"
                />
              )}
            </>
          )}

          {!isUser && !isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-2 -right-2 text-xs bg-primary/10 rounded-full p-1"
            >
              <Sparkles className="h-3 w-3 text-primary" />
            </motion.div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  )
}
