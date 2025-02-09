import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import "./globals.css";
import { ThemeProvider } from "./provider"

const fontSans = GeistSans

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "Generate images using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}