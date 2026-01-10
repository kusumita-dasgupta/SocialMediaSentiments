type ToolStatusBubbleProps = {
  content: string
}

export function ToolStatusBubble({ content }: ToolStatusBubbleProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground"></div>
        {content}
      </div>
    </div>
  )
}
