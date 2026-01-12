import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Lazy-load to avoid build-time errors when env vars are missing
let supabaseInstance: SupabaseClient<Database> | null = null

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL - Supabase features unavailable')
  }
  return url
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY - Supabase features unavailable')
  }
  return key
}

// Lazy-initialized client-side Supabase client
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  }
  return supabaseInstance
}

// Legacy export for backwards compatibility - use getSupabaseClient() for new code
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_, prop) {
    return (getSupabaseClient() as any)[prop]
  },
})

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Export getters for convenience (lazy evaluation)
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
