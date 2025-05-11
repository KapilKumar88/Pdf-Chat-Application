import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error/error-boundary"
import { ThemeProvider } from "@/providers/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import appConfig from "@/config/app.config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: appConfig.APP_NAME,
    template: `%s | ${appConfig.APP_NAME}`,
  },
  applicationName: appConfig.APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appConfig.APP_NAME,
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </ClerkProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
