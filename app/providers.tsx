'use client'

import React from 'react'

// Temporarily disable SessionProvider to fix prerendering errors
// SessionProvider from next-auth/react causes useContext errors during SSR
// Will re-enable when auth pages are ready
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}