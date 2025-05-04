"use client"

import Link from "next/link"
import { ShieldAlert, LogIn, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="bg-destructive/10 p-3 rounded-full">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl mt-4">Access denied</CardTitle>
          <CardDescription className="text-muted-foreground">
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <p className="text-sm text-muted-foreground">
            Please log in with an account that has the necessary permissions, or contact your administrator if you
            believe this is an error.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full gap-2" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Log in
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
