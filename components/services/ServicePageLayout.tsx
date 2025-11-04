/**
 * ServicePageLayout Component
 * Simple layout wrapper for service pages
 */

import { ReactNode } from 'react'

interface ServicePageLayoutProps {
  children: ReactNode
}

export default function ServicePageLayout({ children }: ServicePageLayoutProps) {
  return <div className="min-h-screen">{children}</div>
}
