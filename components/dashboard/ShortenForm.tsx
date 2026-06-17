import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Link2 } from 'lucide-react'
import type { ShortenedUrl } from '@/types'

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function ShortenForm({ onUrlAdded }: { onUrlAdded: (newUrl: ShortenedUrl) => void }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isShortening, setIsShortening] = useState(false)

  const handleShorten = useCallback(async () => {
    const trimmed = inputValue.trim()
    if (!trimmed) {
      setError('Please enter a URL')
      return
    }
    if (!isValidUrl(trimmed)) {
      setError('Please enter a valid URL (include https://)')
      return
    }

    setError(null)
    setIsShortening(true)

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })

      if (!res.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await res.json()
      onUrlAdded(data)
      setInputValue('')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsShortening(false)
    }
  }, [inputValue, onUrlAdded])

  return (
    <Card className="glass-card border-border/50 overflow-visible">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Link2 className="w-5 h-5 text-primary" />
          Shorten a URL
        </CardTitle>
        <CardDescription>
          Paste your long URL below and get a short, trackable link instantly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              id="url-input"
              type="url"
              placeholder="https://example.com/your-very-long-url..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                if (error) setError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleShorten()
              }}
              className="h-11 text-sm rounded-xl bg-background/60 border-border/60 focus-visible:border-primary focus-visible:ring-primary/30 pr-4 placeholder:text-muted-foreground/60"
              aria-invalid={!!error}
            />
            {error && (
              <p className="text-xs text-destructive mt-1.5 absolute -bottom-5 left-0">{error}</p>
            )}
          </div>
          <Button
            id="shorten-button"
            onClick={handleShorten}
            disabled={isShortening}
            className="h-11 px-6 rounded-xl cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 shrink-0 shadow-lg shadow-primary/10"
          >
            {isShortening ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Shortening...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Shorten
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
