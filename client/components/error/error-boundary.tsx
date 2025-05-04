"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <Card className="w-full max-w-md border-destructive/20">
            <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
              <div className="bg-destructive/10 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl mt-4">Something went wrong</CardTitle>
              <CardDescription className="text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-2">
              <div className="bg-muted p-3 rounded-md text-sm mb-4 overflow-auto max-h-32">
                <p className="font-mono">{this.state.error?.message || "An unknown error occurred"}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button onClick={() => window.location.reload()} className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh page
              </Button>
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Return to home
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
