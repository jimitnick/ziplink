import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Zip Link — Lightning-Fast URL Shortener',
  description: 'Shorten, track, and manage your URLs with powerful analytics. Zip Link makes link management effortless.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} font-sans antialiased`}>
        <ClerkProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}