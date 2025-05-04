"use client"

import Link from "next/link"
import { Search, LogIn, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl mt-4">Page not found</CardTitle>
          <CardDescription className="text-muted-foreground">
            We couldn't find the authentication page you were looking for.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <p className="text-sm text-muted-foreground">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full gap-2" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Go to login
            </Link>
          </Button>
          <Button variant="outline" className="w-full gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
