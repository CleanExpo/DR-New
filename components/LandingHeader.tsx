/**
 * LandingHeader Component
 * Simple header for landing pages
 */

import { ReactNode } from 'react'

interface LandingHeaderProps {
  children?: ReactNode
}

export default function LandingHeader({ children }: LandingHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-6 py-4">
        {children}
      </div>
    </header>
  )
}
