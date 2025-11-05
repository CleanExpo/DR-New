'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ClientLayoutProps {
  children: ReactNode
}

/**
 * Client Portal Layout
 *
 * Wraps client portal pages with SessionProvider for authentication.
 * This layout is isolated from the main app to prevent SessionProvider
 * from affecting static page generation.
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  return <SessionProvider>{children}</SessionProvider>
}
