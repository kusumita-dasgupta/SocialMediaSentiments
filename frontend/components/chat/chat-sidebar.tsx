"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

type ChatSidebarProps = {
  onNewChat: () => void
  currentChatId: string
}

// Mock previous chats
const mockChats = [
  { id: "1", title: "Current Chat", timestamp: "Just now" },
  { id: "2", title: "Instagram campaign analysis", timestamp: "Yesterday" },
  { id: "3", title: "YouTube comment trends", timestamp: "2 days ago" },
  { id: "4", title: "Product feedback summary", timestamp: "1 week ago" },
]

export function ChatSidebar({ onNewChat, currentChatId }: ChatSidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      {/* New Chat Button */}
      <div className="p-3">
        <Button onClick={onNewChat} className="w-full justify-start gap-2 bg-transparent" variant="outline">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              className={cn(
                "flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent",
                currentChatId === chat.id && "bg-sidebar-accent",
              )}
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-sidebar-foreground/60" />
              <div className="flex-1 overflow-hidden">
                <div className="truncate font-medium text-sidebar-foreground">{chat.title}</div>
                <div className="text-xs text-sidebar-foreground/60">{chat.timestamp}</div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
