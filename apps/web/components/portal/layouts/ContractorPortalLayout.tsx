// @ts-nocheck

/**
 * NRPG Growth Portal - Contractor Layout
 *
 * Premium dashboard layout for contractor firm owners with:
 * - Earth-tone color palette (#7A5C58, #C89F97, #20B2AA)
 * - Magazine-style card hover effects
 * - Sidebar navigation with collapsible menu
 * - Header with search, notifications, and profile
 * - Outfit (headings) + Lora (body) typography
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Shield,
  TrendingUp,
  GraduationCap,
  PlusCircle,
  Search,
  Bell,
  Settings,
  ChevronLeft,
  Menu,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard/contractor', icon: LayoutDashboard },
  { label: 'Active Opportunities', href: '/dashboard/contractor/opportunities', icon: FileText },
  { label: 'Brand & Compliance', href: '/dashboard/contractor/compliance', icon: Shield },
  { label: 'Financial Insights', href: '/dashboard/contractor/financial', icon: TrendingUp },
  { label: 'Growth & Training', href: '/dashboard/contractor/training', icon: GraduationCap },
];

interface ContractorPortalLayoutProps {
  children: React.ReactNode;
  firmName?: string;
  firmStatus?: string;
}

export function ContractorPortalLayout({
  children,
  firmName = 'Your Restoration Firm',
  firmStatus = 'Growth Partner',
}: ContractorPortalLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-portal-bg">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col bg-portal-card border-r border-portal-border shadow-lg transition-[width] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
          sidebarCollapsed ? 'w-20' : 'w-64',
          'hidden lg:flex'
        )}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-portal-border">
          <div className="size-10 bg-earth-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="text-white size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
            </svg>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-portal-text text-sm font-bold leading-tight font-heading">NRPG Growth</h1>
              <p className="text-portal-muted text-xs">Firm Owner Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-[background-color,color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
                  isActive
                    ? 'bg-earth-secondary text-white shadow-md'
                    : 'text-portal-muted hover:bg-portal-border hover:text-earth-primary',
                  sidebarCollapsed && 'justify-center'
                )}
              >
                <Icon className="size-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <p className="text-sm font-heading font-medium">{item.label}</p>
                )}
              </Link>
            );
          })}
        </nav>

        {/* New Initiative Button */}
        <div className="p-4 border-t border-portal-border">
          <button
            className={cn(
              'w-full flex items-center justify-center gap-2 bg-nrpg-teal hover:bg-nrpg-teal-dark text-white text-sm font-bold font-heading py-2.5 rounded-lg transition-[background-color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] shadow-md hover:shadow-lg',
              sidebarCollapsed && 'px-2'
            )}
          >
            <PlusCircle className="size-4" />
            {!sidebarCollapsed && <span>Propose New Initiative</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-4 border-t border-portal-border text-portal-muted hover:text-earth-primary transition-colors"
        >
          <ChevronLeft className={cn('size-5 mx-auto transition-transform', sidebarCollapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-portal-card shadow-xl">
            {/* Mobile sidebar content - same as desktop */}
            <div className="p-6 flex items-center gap-3 border-b border-portal-border">
              <div className="size-10 bg-earth-primary rounded-lg flex items-center justify-center">
                <svg className="text-white size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-portal-text text-sm font-bold leading-tight font-heading">NRPG Growth</h1>
                <p className="text-portal-muted text-xs">Firm Owner Portal</p>
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-1 mt-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                      isActive ? 'bg-earth-secondary text-white' : 'text-portal-muted hover:bg-portal-border hover:text-earth-primary'
                    )}
                  >
                    <Icon className="size-5" />
                    <p className="text-sm font-heading font-medium">{item.label}</p>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 border-b border-portal-border bg-portal-card sticky top-0 z-10 shadow-sm">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-portal-border/50 text-portal-muted"
          >
            <Menu className="size-5" />
          </button>

          {/* Search Bar */}
          <div className="flex items-center gap-4 flex-1 max-w-xl ml-4 lg:ml-0">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-portal-muted size-5" />
              <input
                type="text"
                placeholder="Explore opportunities, projects, or certifications..."
                className="w-full bg-portal-border/50 border border-portal-border focus:ring-1 focus:ring-earth-primary rounded-lg py-2 pl-11 pr-4 text-sm text-portal-text placeholder-portal-muted font-body"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Notification & Settings */}
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-portal-border/50 text-portal-muted hover:text-earth-primary relative">
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-earth-primary rounded-full border border-portal-card" />
              </button>
              <button className="p-2 rounded-lg bg-portal-border/50 text-portal-muted hover:text-earth-primary hidden sm:block">
                <Settings className="size-5" />
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-portal-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-portal-text font-heading">{firmName}</p>
                <p className="text-xs text-nrpg-teal font-medium">{firmStatus}</p>
              </div>
              <div className="size-10 rounded-full bg-earth-secondary ring-2 ring-earth-secondary/50 flex items-center justify-center text-white font-heading font-bold">
                {firmName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>

        {/* Footer */}
        <footer className="px-4 lg:px-8 py-6 border-t border-portal-border bg-portal-card/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-portal-muted font-body">
              &copy; 2026 National Restoration Professionals Group (NRPG). All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-portal-muted hover:text-earth-primary font-body">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-portal-muted hover:text-earth-primary font-body">
                Service Terms
              </Link>
              <Link href="/support" className="text-xs text-portal-muted hover:text-earth-primary font-body">
                Partner Support
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ContractorPortalLayout;
