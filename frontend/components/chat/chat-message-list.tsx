"use client"

import { useEffect, useRef } from "react"
import { MessageBubble } from "./message-bubble"
import { ToolStatusBubble } from "./tool-status-bubble"
import type { ChatMessage } from "./chat-shell"
import { Sparkles } from "lucide-react"

type ChatMessageListProps = {
  messages: ChatMessage[]
  isStreaming: boolean
}

export function ChatMessageList({ messages, isStreaming }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Social Listening Agent</h2>
          <p className="text-muted-foreground">Ask about a post, keyword, or video URL…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        {messages.map((message) => {
          if ("type" in message && message.type === "tool") {
            return <ToolStatusBubble key={message.id} content={message.content} />
          }
          return <MessageBubble key={message.id} role={message.role} content={message.content} />
        })}
        {isStreaming && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
            </div>
            <span>Assistant is typing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
