import { Bot, } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import serverSideConfig from "@/config/server.config"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-br from-background to-background/80">
      <div className="z-10 w-full max-w-5xl flex flex-col h-[90vh]">
        <Card className="flex-grow mb-4 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 h-full">
            <div
              className="h-full flex flex-col items-center justify-center text-center p-4"
            >
              <Bot className="h-16 w-16 text-primary/40 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Welcome to {serverSideConfig?.APP_NAME}</h2>
              <p className="text-muted-foreground max-w-md">
                Upload your documents and start chatting with AI about their content. I can answer questions,
                summarize information, and help you understand your documents better.
              </p>
              <Button className="mt-4">
                <SignedIn>
                  <Link href="/chat">Get started</Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/signin">Get started</Link>
                </SignedOut>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
