import { Card, CardContent } from '@/components/ui/card'
import { LinkIcon, MousePointerClick, TrendingUp } from 'lucide-react'
import type { ShortenedUrl } from '@/types'

export function StatsCards({ urls }: { urls: ShortenedUrl[] }) {
  const totalClicks = urls.reduce((sum, u) => sum + (u.click_count || 0), 0)
  const activeLinks = urls.filter((u) => u.status === 'live').length

  const stats = [
    { label: 'Total Links', value: urls.length, icon: LinkIcon, color: 'text-primary' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: MousePointerClick, color: 'text-emerald-400' },
    { label: 'Active Links', value: activeLinks, icon: TrendingUp, color: 'text-amber-400' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="glass-card border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
