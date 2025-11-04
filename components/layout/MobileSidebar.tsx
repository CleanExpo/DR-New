'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Receipt,
  Users,
  BarChart3,
  Settings,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface MenuItem {
  title: string
  href: string
  icon: React.ElementType
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Jobs',
    href: '/admin/jobs',
    icon: Briefcase,
    children: [
      { title: 'All Jobs', href: '/admin/jobs', icon: Briefcase },
      { title: 'Create Job', href: '/admin/jobs/create', icon: Briefcase },
      { title: 'Emergency Queue', href: '/admin/jobs/emergency', icon: Briefcase },
    ],
  },
  {
    title: 'Schedule',
    href: '/admin/schedule',
    icon: Calendar,
    children: [
      { title: 'Calendar View', href: '/admin/schedule', icon: Calendar },
      { title: 'Create Appointment', href: '/admin/schedule/create', icon: Calendar },
      { title: 'Optimise Routes', href: '/admin/schedule/routes', icon: Calendar },
    ],
  },
  {
    title: 'Invoices',
    href: '/admin/invoices',
    icon: Receipt,
    children: [
      { title: 'All Invoices', href: '/admin/invoices', icon: Receipt },
      { title: 'Create Invoice', href: '/admin/invoices/create', icon: Receipt },
      { title: 'Financial Summary', href: '/admin/invoices/summary', icon: Receipt },
    ],
  },
  {
    title: 'Contractors',
    href: '/admin/contractors',
    icon: Users,
    children: [
      { title: 'All Contractors', href: '/admin/contractors', icon: Users },
      { title: 'Matching', href: '/admin/contractors/matching', icon: Users },
      { title: 'Subscriptions', href: '/admin/contractors/subscriptions', icon: Users },
    ],
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    children: [
      { title: 'Dashboard', href: '/admin/analytics', icon: BarChart3 },
      { title: 'Reports', href: '/admin/analytics/reports', icon: BarChart3 },
      { title: 'Revenue', href: '/admin/analytics/revenue', icon: BarChart3 },
    ],
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 z-50 h-full w-80 border-r border-sidebar-border bg-sidebar lg:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                    NRPG Platform
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-hover"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpanded(item.title)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                            isActive(item.href)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-sidebar-foreground hover:bg-sidebar-hover'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              expandedItems.includes(item.title) && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItems.includes(item.title) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
                                    isActive(child.href)
                                      ? 'bg-primary/10 font-medium text-primary'
                                      : 'text-muted-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground'
                                  )}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-hover'
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* User Profile */}
              <div className="border-t border-sidebar-border p-3">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-sidebar-hover">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-sidebar-foreground">
                      Admin User
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      admin@nrpg.com.au
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="mt-2 w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
