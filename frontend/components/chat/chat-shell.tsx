"use client"

import { useState } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatMessageList } from "./chat-message-list"
import { ChatInput } from "./chat-input"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeft } from "lucide-react"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export type ToolMessage = {
  id: string
  type: "tool"
  content: string
}

export type ChatMessage = Message | ToolMessage

export function ChatShell() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }
    setMessages((prev) => [...prev, userMessage])
    setIsStreaming(true)

    // Create assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      // Prepare messages for API (only user and assistant messages)
      const apiMessages = [...messages, userMessage]
        .filter((m): m is Message => "role" in m)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("No reader available")
      }

      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (!line.trim()) continue

          try {
            const event = JSON.parse(line)

            if (event.type === "delta") {
              // Append to assistant message
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantMessageId ? { ...m, content: m.content + event.content } : m)),
              )
            } else if (event.type === "tool") {
              // Add tool status message
              const toolMessage: ToolMessage = {
                id: Date.now().toString() + Math.random(),
                type: "tool",
                content: event.content,
              }
              setMessages((prev) => [...prev, toolMessage])
            } else if (event.type === "done") {
              break
            }
          } catch (e) {
            console.error("[v0] Failed to parse event:", line, e)
          }
        }
      }
    } catch (error) {
      console.error("[v0] Error streaming response:", error)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content: "Sorry, I encountered an error. Please try again.",
              }
            : m,
        ),
      )
    } finally {
      setIsStreaming(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && <ChatSidebar onNewChat={handleNewChat} currentChatId="1" />}

      <div className="flex flex-1 flex-col">
        {/* Header with toggle */}
        <div className="flex items-center gap-2 border-b border-border p-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </Button>
          <h1 className="text-lg font-semibold">Social Listening Agent</h1>
        </div>

        {/* Main chat area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatMessageList messages={messages} isStreaming={isStreaming} />
          <ChatInput onSendMessage={handleSendMessage} disabled={isStreaming} />
        </div>
      </div>
    </div>
  )
}
