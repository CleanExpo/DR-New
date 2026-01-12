import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Lazy-load environment variables to avoid build-time errors
function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL - Supabase realtime features unavailable')
  }
  return url
}

function getSupabaseServiceKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY - Supabase admin features unavailable')
  }
  return key
}

// Server-side Supabase client (uses service role key for admin operations)
export function createServerClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Singleton for server operations
let serverClient: ReturnType<typeof createClient<Database>> | null = null

export function getServerClient() {
  if (!serverClient) {
    serverClient = createServerClient()
  }
  return serverClient
}

// Check if Supabase is configured (for graceful degradation)
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
