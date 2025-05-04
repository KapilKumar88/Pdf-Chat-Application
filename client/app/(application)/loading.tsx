import { Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Sparkles className="h-10 w-10 text-primary/40" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
