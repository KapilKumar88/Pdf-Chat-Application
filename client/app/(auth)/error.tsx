"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, LogIn, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="bg-destructive/10 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl mt-4">Authentication error</CardTitle>
          <CardDescription className="text-muted-foreground">
            We apologize for the inconvenience. An error occurred during authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <div className="bg-muted p-3 rounded-md text-sm mb-4 overflow-auto max-h-32">
            <p className="font-mono">{error.message || "An unknown error occurred"}</p>
            {error.digest && <p className="font-mono text-xs mt-2 text-muted-foreground">Error ID: {error.digest}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={reset} className="w-full gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Return to login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
