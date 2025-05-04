"use client"

import Link from "next/link"
import { Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Maintenance() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl mt-4">Maintenance in progress</CardTitle>
          <CardDescription className="text-muted-foreground">
            We're currently performing scheduled maintenance.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <p className="text-sm text-muted-foreground">
            Our service is temporarily unavailable while we make improvements. We'll be back shortly. Thank you for your
            patience.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full gap-2" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Refresh page
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <Clock className="h-4 w-4" />
              Check status
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
