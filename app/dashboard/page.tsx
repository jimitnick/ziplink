'use client'

import { useState, useEffect, useCallback } from 'react'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ShortenForm } from '@/components/dashboard/ShortenForm'
import { LinksTable } from '@/components/dashboard/LinksTable'
import type { ShortenedUrl } from '@/types'
import { useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getToken } = useAuth()

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics')
      if (!res.ok) throw new Error('Failed to fetch analytics')
      const data = await res.json()
      setUrls(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  useEffect(() => {
    let supabase: any;
    let channel: any;

    const setupRealtime = async () => {
      const token = await getToken({ template: 'supabase' })
      if (!token) return

      supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      )

      channel = supabase
        .channel('realtime:url_clicks')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'url' },
          (payload: any) => {
            const updatedUrl = payload.new;
            setUrls((prevUrls) => 
              prevUrls.map((u) => u.id === updatedUrl.id 
                ? { ...u, click_count: updatedUrl.click_count, last_clicked: updatedUrl.last_clicked } 
                : u
              )
            )
          }
        )
        .subscribe()
    }

    setupRealtime()

    return () => {
      if (channel) {
        supabase?.removeChannel(channel)
      }
    }
  }, [getToken])

  const handleUrlAdded = useCallback((newUrl: ShortenedUrl) => {
    setUrls((prev) => [newUrl, ...prev])
  }, [])

  const handleDelete = useCallback(async (id: string | number) => {
    // Optimistic delete
    setUrls((prev) => prev.filter((u) => u.id !== id))
    // Note: You would normally hit a DELETE endpoint here
    // e.g., fetch(`/api/urls/${id}`, { method: 'DELETE' })
  }, [])

  const handleToggleStatus = useCallback(async (id: string | number) => {
    // Optimistic update
    setUrls((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'live' ? 'inactive' : 'live' } : u
      )
    )
    // Note: You would normally hit a PUT/PATCH endpoint here
    // e.g., fetch(`/api/urls/${id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) })
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Failed to load dashboard: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <StatsCards urls={urls} />
      <ShortenForm onUrlAdded={handleUrlAdded} />
      <LinksTable 
        urls={urls} 
        onToggleStatus={handleToggleStatus} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
