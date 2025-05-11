"use client";

import type React from "react";
import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ConversationProvider } from "@/context-api/conversation";
import appConfig from "@/config/app.config";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ConversationProvider>
      <div className="flex h-screen">
        <div className="hidden md:block">
          <ChatSidebar />
        </div>

        {/* Mobile sidebar */}
        <ChatSidebar
          isMobile
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="h-14 border-b flex items-center gap-4 px-4 bg-background/95 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="font-bold">{appConfig.APP_NAME}</h1>
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ConversationProvider>
  );
}
