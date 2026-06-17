export interface ShortenedUrl {
  id: number | string
  original_url: string
  short_url: string
  status: 'live' | 'inactive'
  click_count: number
  created_at: string
  user_id?: string
}
