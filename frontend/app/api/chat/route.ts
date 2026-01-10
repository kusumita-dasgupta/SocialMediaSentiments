import type { NextRequest } from "next/server"

type Message = {
  role: "user" | "assistant"
  content: string
}

type ChatRequest = {
  messages: Message[]
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()

    // Create a readable stream for the response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send tool/status message
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "tool",
                content: "Connecting to Social Listening Agent...",
              }) + "\n",
            ),
          )

          // Simulate streaming response - replace with actual backend call
          // TODO: Replace this with actual call to your FastAPI backend (app.py)
          // const response = await fetch('YOUR_BACKEND_URL/chat', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(body),
          // })

          const mockResponse =
            "I'm the Social Listening Agent! I can help you analyze posts, keywords, and video URLs. This is a demo response - connect me to your FastAPI backend to enable real functionality."

          // Send another tool message
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "tool",
                content: "Analyzing request...",
              }) + "\n",
            ),
          )

          // Simulate token-by-token streaming
          for (let i = 0; i < mockResponse.length; i++) {
            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: "delta",
                  content: mockResponse[i],
                }) + "\n",
              ),
            )
            // Small delay to simulate streaming
            await new Promise((resolve) => setTimeout(resolve, 20))
          }

          // Send done message
          controller.enqueue(encoder.encode(JSON.stringify({ type: "done" }) + "\n"))

          controller.close()
        } catch (error) {
          console.error("[v0] Stream error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
