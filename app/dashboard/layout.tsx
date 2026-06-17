import Link from 'next/link'
import { Show, UserButton, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Zap, LogIn } from 'lucide-react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== Dashboard Top Bar ===== */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" id="dashboard-logo">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Zip<span className="gradient-text">Link</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton>
                <Button size="sm" id="dashboard-sign-in" className="cursor-pointer">
                  <LogIn className="w-4 h-4 mr-1.5" />
                  Sign In
                </Button>
              </SignInButton>
            </Show>
          </div>
        </div>
      </header>

      {/* ===== Dashboard Content ===== */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
