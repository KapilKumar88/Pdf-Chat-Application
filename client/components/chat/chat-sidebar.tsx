"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Search,
  FileText,
  Folder,
  User,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_ENDPOINTS } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import { Conversation } from "@/lib/types";

interface ChatSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatSidebar({
  isMobile = false,
  isOpen = false,
  onClose,
}: Readonly<ChatSidebarProps>) {
  const { getToken } = useAuth();
  const [conversationList, setConversationList] = useState<Array<Conversation>>(
    []
  );
  const [documentList, setDocumentList] = useState([]);
  const [activeTab, setActiveTab] = useState<"chats" | "documents">("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const handleLogout = () => {};

  useEffect(() => {
    getToken()
      .then((token) => {
        return fetch(API_ENDPOINTS.CONVERSATIONS.LIST, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched conversations:", data);
        setConversationList(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });

    fetch(API_ENDPOINTS.DOCUMENTS.LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched documents:", data);
        setDocumentList(data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt={"User"}
            />
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{"User"}</p>
            <p className="text-xs text-muted-foreground">
              {"user@example.com"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium transition-colors",
            activeTab === "chats"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("chats")}
        >
          Chats
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium transition-colors",
            activeTab === "documents"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${
              activeTab === "chats" ? "chats" : "documents"
            }...`}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {activeTab === "chats" ? (
          <div className="space-y-1 p-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 mb-2 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <Link href="/dashboard">
                <Plus className="h-4 w-4" />
                <span>New Chat</span>
              </Link>
            </Button>

            {conversationList?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                <MessageSquare className="h-8 w-8 mb-2" />
                <h3 className="font-medium">No conversations yet</h3>
                <p className="text-sm">
                  Start a new conversation to begin chatting
                </p>
              </div>
            )}

            {conversationList?.length > 0 &&
              conversationList.map((conversation) => (
                <Button
                  key={conversation.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left h-auto py-3 px-4",
                    pathname === `/chat/${conversation.id}` && "bg-muted"
                  )}
                  asChild
                >
                  <Link href={`/chat/${conversation.id}`}>
                    <div className="flex flex-col items-start gap-1 w-full">
                      <div className="flex items-center w-full">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium truncate">
                          {conversation.title}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {conversation?.date ?? "date"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate w-full pl-6">
                        {conversation?.preview ?? "preview"}
                      </p>
                      {conversation.totalDocuments > 0 && (
                        <div className="flex items-center gap-1 pl-6 mt-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {conversation.totalDocuments} documents
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </Button>
              ))}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            <div className="flex items-center justify-between px-4 py-2">
              <h3 className="text-sm font-medium">Your Documents</h3>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>Upload</span>
              </Button>
            </div>
            {documentList?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                <MessageSquare className="h-8 w-8 mb-2" />
                <h3 className="font-medium">No documents yet</h3>
                <p className="text-sm">
                  Start a new conversation to begin chatting
                </p>
              </div>
            )}

            {documentList?.length > 0 &&
              documentList.map((doc) => (
                <Button
                  key={doc.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 px-4"
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="bg-primary/10 p-2 rounded">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="font-medium text-sm truncate">
                        {doc.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                          {doc.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {doc.size}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {doc.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2" asChild>
          <Link href="/documents/upload">
            <Folder className="h-4 w-4" />
            <span>Document Manager</span>
          </Link>
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-background border-r shadow-lg"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="h-full w-80 border-r bg-background">{sidebarContent}</div>
  );
}
