import { useState, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Link2,
  Copy,
  Check,
  Trash2,
  BarChart3,
  Globe,
  MousePointerClick,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import type { ShortenedUrl } from '@/types'

// --- Helpers ---
function extractSiteName(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '')
    return hostname
  } catch {
    return url
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never'
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function LinksTable({
  urls,
  onToggleStatus,
  onDelete
}: {
  urls: ShortenedUrl[];
  onToggleStatus: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}) {
  const [copiedId, setCopiedId] = useState<string | number | null>(null)

  const handleCopy = useCallback(async (id: string | number, url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }, [])

  return (
    <Card className="glass-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-primary" />
          Your Links
        </CardTitle>
        <CardDescription>
          Manage and monitor all your shortened links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {urls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Link2 className="w-8 h-8 text-primary/50" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No links yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Paste a URL above and click &quot;Shorten&quot; to create your first short link.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-border/40 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">Site</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">Status</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">Clicks</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">Short URL</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">Created</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {urls.map((url) => {
                  const fullShortUrl = `http://ziplink-omega.vercel.app/api/${url.short_url}`
                  return (
                    <TableRow key={url.id} className="border-border/30 group">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Globe className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate max-w-[180px]">{extractSiteName(url.original_url)}</p>
                            <Tooltip>
                              <TooltipTrigger >
                                <p className="text-xs text-muted-foreground truncate max-w-[180px] cursor-help">
                                  {url.original_url}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="max-w-sm">
                                <p className="break-all text-xs">{url.original_url}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <button
                          id={`status-toggle-${url.id}`}
                          onClick={() => onToggleStatus(url.id)}
                          className="cursor-pointer"
                        >
                          <Badge
                            variant={url.status === 'live' ? 'default' : 'secondary'}
                            className={
                              url.status === 'live'
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${url.status === 'live' ? 'bg-emerald-400' : 'bg-muted-foreground'}`} />
                            {url.status === 'live' ? 'Active' : 'Inactive'}
                          </Badge>
                        </button>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <MousePointerClick className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium tabular-nums">{(url.click_count || 0).toLocaleString()}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded-md">
                            {url.short_url}
                          </code>
                          <Tooltip>
                            <TooltipTrigger >
                              <Button
                                id={`copy-${url.id}`}
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => handleCopy(url.id, fullShortUrl)}
                                className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                              >
                                {copiedId === url.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copiedId === url.id ? 'Copied!' : 'Copy URL'}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{formatDate(url.created_at)}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Tooltip>
                            <TooltipTrigger >
                              <Button
                                id={`visit-${url.id}`}
                                variant="ghost"
                                size="icon-xs"
                                className="cursor-pointer opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                                onClick={() => window.open(fullShortUrl, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Open link</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger >
                              <Button
                                id={`delete-${url.id}`}
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => onDelete(url.id)}
                                className="cursor-pointer opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:!text-destructive transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete link</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
