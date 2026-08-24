'use client'

/**
 * Demo Layout
 *
 * Wraps all demo pages with the DemoProvider.
 */

import { DemoProvider } from '@/lib/demo'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider enabled>
      {children}
    </DemoProvider>
  )
}
