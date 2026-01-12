'use client'

import React from 'react'
import type { ReactNode } from 'react'
import { PublicHeader } from '@/components/public/layouts/PublicHeader'
import { PublicFooter } from '@/components/public/layouts/PublicFooter'

interface PublicLayoutProps {
  children: ReactNode
}

/**
 * Public Layout for Disaster Recovery Australia client-facing website
 *
 * Features:
 * - Light theme with emerald green (#10B981) accents
 * - Clean, accessible design for property owners
 * - No authentication required
 * - SEO-optimized structure
 * - PublicHeader with navigation
 * - PublicFooter with contact information
 *
 * This layout wraps all public pages including:
 * - Home page (disaster recovery information)
 * - Service pages (flood, fire, storm, water damage)
 * - About page
 * - Contact page
 * - Help center
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="public-layout min-h-screen flex flex-col bg-slate-50">
      {/* Custom CSS Variables for Public Site Theme */}
      <style jsx global>{`
        .public-layout {
          /* Public Site Theme - Light & Fresh */
          --public-primary: #10B981;
          --public-primary-hover: #059669;
          --public-primary-light: #D1FAE5;
          --public-primary-dark: #065F46;

          --public-secondary: #0891B2;
          --public-secondary-hover: #0E7490;
          --public-secondary-light: #CFFAFE;

          --public-emergency: #DC2626;
          --public-emergency-hover: #B91C1C;
          --public-emergency-light: #FEE2E2;

          --public-background: #FFFFFF;
          --public-surface: #F8FAFC;
          --public-surface-elevated: #FFFFFF;

          --public-text: #0F172A;
          --public-text-secondary: #475569;
          --public-text-muted: #64748B;

          --public-border: #E2E8F0;
          --public-border-light: #F1F5F9;

          /* Shadows for public site */
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* Header - Fixed navigation with emerald branding */}
      <PublicHeader />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer - Contact information and links */}
      <PublicFooter />
    </div>
  )
}
