'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Zap,
  BarChart3,
  Shield,
  Link2,
  ArrowRight,
  MousePointerClick,
  Globe,
  Clock,
  ChevronRight,
} from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ===== Animated Background Orbs ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full animate-float"
          style={{ background: 'radial-gradient(circle, oklch(0.55 0.2 270 / 15%), transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full animate-float-delayed"
          style={{ background: 'radial-gradient(circle, oklch(0.6 0.18 310 / 12%), transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, oklch(0.55 0.15 230 / 10%), transparent 70%)' }}
        />
      </div>

      {/* ===== Navbar ===== */}
      <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Zip<span className="gradient-text">Link</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stats</a>
          </div>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="ghost" size="sm" id="nav-sign-in" className="cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" id="nav-sign-up" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80">
                  Get Started
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button size="sm" id="nav-dashboard" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80">
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </Show>
          </div>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-36 md:pb-44">
        <div className="flex flex-col items-center text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-8">
            <Zap className="w-3 h-3" />
            Lightning-fast URL shortening
            <ChevronRight className="w-3 h-3" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            Shorten links.
            <br />
            <span className="gradient-text">Amplify reach.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Transform long, cluttered URLs into clean, trackable links.
            Get real-time analytics, click tracking, and complete link management — all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Show when="signed-out">
              <SignUpButton>
                <Button size="lg" id="hero-get-started" className="cursor-pointer h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl shadow-lg shadow-primary/20">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button size="lg" id="hero-dashboard" className="cursor-pointer h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl shadow-lg shadow-primary/20">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Show>
            <a href="#features">
              <Button variant="outline" size="lg" className="cursor-pointer h-12 px-8 text-base rounded-xl">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        {/* Hero visual — floating mock link cards */}
        <div className="mt-20 relative max-w-3xl mx-auto animate-fade-in">
          <div className="glass-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">ziplink.app/dashboard</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/30">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm truncate flex-1">https://example.com/very-long-marketing-campaign-url...</span>
                <span className="text-xs font-mono text-primary px-2 py-0.5 rounded bg-primary/10">zip.li/mktg</span>
                <span className="text-xs text-muted-foreground">2.4k clicks</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/30">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm truncate flex-1">https://docs.google.com/spreadsheets/d/1a2b3c4d...</span>
                <span className="text-xs font-mono text-primary px-2 py-0.5 rounded bg-primary/10">zip.li/sheet</span>
                <span className="text-xs text-muted-foreground">891 clicks</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/30">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm truncate flex-1">https://github.com/your-org/project-repo/pull/42...</span>
                <span className="text-xs font-mono text-primary px-2 py-0.5 rounded bg-primary/10">zip.li/pr42</span>
                <span className="text-xs text-muted-foreground">156 clicks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="features" className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to
            <span className="gradient-text"> manage links</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to help you shorten, track, and optimize every link you share.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Generate short links in milliseconds. Our infrastructure is built for speed, ensuring your links are always available and redirect instantly.',
            },
            {
              icon: BarChart3,
              title: 'Rich Analytics',
              description: 'Track every click with detailed analytics. See click counts, geographic data, referrer sources, and performance trends over time.',
            },
            {
              icon: Shield,
              title: 'Secure & Reliable',
              description: 'Enterprise-grade security with 99.9% uptime. Your links are protected, monitored, and always accessible when you need them.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section id="how-it-works" className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How it
            <span className="gradient-text"> works</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your links.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: Link2,
              title: 'Paste Your Link',
              description: 'Drop your long URL into the input field. We accept any valid URL from any domain.',
            },
            {
              step: '02',
              icon: MousePointerClick,
              title: 'Click Shorten',
              description: 'Hit the shorten button and get your clean, compact link in under a second.',
            },
            {
              step: '03',
              icon: BarChart3,
              title: 'Track & Share',
              description: 'Share your new link anywhere and monitor its performance with real-time analytics.',
            },
          ].map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center group">
              {/* Connector line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary mb-2 tracking-widest">{item.step}</span>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section id="stats" className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="glass-card rounded-3xl p-12 md:p-16">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { value: 50000, suffix: '+', label: 'Links Shortened', icon: Link2 },
              { value: 2400000, suffix: '+', label: 'Clicks Tracked', icon: MousePointerClick },
              { value: 99, suffix: '.9%', label: 'Uptime', icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <div className="text-4xl md:text-5xl font-bold gradient-text">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Ready to shorten your first link?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join thousands of users who trust Zip Link for fast, reliable, and insightful link management.
        </p>
        <Show when="signed-out">
          <SignUpButton>
            <Button size="lg" id="cta-sign-up" className="cursor-pointer h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl shadow-lg shadow-primary/20">
              Start for Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Link href="/dashboard">
            <Button size="lg" id="cta-dashboard" className="cursor-pointer h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl shadow-lg shadow-primary/20">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Show>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold">
                Zip<span className="gradient-text">Link</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
              <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Zip Link. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
