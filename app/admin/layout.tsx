'use client'

import * as React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { motion } from 'framer-motion'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  // Persist sidebar state
  React.useEffect(() => {
    const saved = localStorage.getItem('nrpg-sidebar-collapsed')
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  const handleCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
    localStorage.setItem('nrpg-sidebar-collapsed', JSON.stringify(collapsed))
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="nrpg-theme">
      <div className="relative min-h-screen bg-background">
        <Sidebar collapsed={sidebarCollapsed} onCollapse={handleCollapse} />

        <div className="flex flex-col">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onMenuClick={() => handleCollapse(!sidebarCollapsed)}
          />

          <motion.main
            initial={false}
            animate={{ marginLeft: sidebarCollapsed ? 64 : 280 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="min-h-[calc(100vh-4rem)] p-6"
          >
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </motion.main>
        </div>
      </div>
    </ThemeProvider>
  )
}
