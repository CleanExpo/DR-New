import type { ReactNode } from 'react'
import { PublicHeader } from '@/components/public/layouts/PublicHeader'
import { PublicFooter } from '@/components/public/layouts/PublicFooter'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />
      <main className="flex-1 w-full">
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}
