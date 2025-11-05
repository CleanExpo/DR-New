'use client'

// import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Root Providers Component
 *
 * NOTE: SessionProvider is disabled for static page generation.
 * If you need authentication on specific pages, wrap those pages
 * individually with SessionProvider in their own layout.
 *
 * Example for authenticated pages:
 * 'use client'
 * import { SessionProvider } from 'next-auth/react'
 * export default function AuthLayout({ children }) {
 *   return <SessionProvider>{children}</SessionProvider>
 * }
 */
export function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}