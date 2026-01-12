'use client'

import React from 'react'
import { ContractorHeader } from '@/components/contractor/layouts/ContractorHeader'
import { ContractorFooter } from '@/components/contractor/layouts/ContractorFooter'
import type { ReactNode } from 'react'

interface ContractorLayoutProps {
  children: ReactNode
}

/**
 * Layout for NRPG Contractor Portal
 *
 * Features:
 * - Premium dark theme (slate-900/950)
 * - Teal/Blue color scheme (#0047FF primary, #00BFA6 accent)
 * - Supports both public routes (/contractor/join) and protected routes (/contractor/portal)
 * - Consistent header/footer across all contractor pages
 * - Professional premium feel for contractor network
 */
export default function ContractorLayout({ children }: ContractorLayoutProps) {
  return (
    <div className="contractor-theme min-h-screen flex flex-col bg-slate-950">
      {/* Contractor-specific CSS variables */}
      <style jsx global>{`
        .contractor-theme {
          /* Primary Colors - Teal/Blue Professional Scheme */
          --color-primary: #0047FF;
          --color-primary-hover: #0039CC;
          --color-primary-light: #3D7EFF;
          --color-accent: #00BFA6;
          --color-accent-hover: #00A68E;
          --color-accent-light: #33CCBB;

          /* Dark Theme Background Colors */
          --color-bg-primary: #020617;    /* slate-950 */
          --color-bg-secondary: #0f172a;  /* slate-900 */
          --color-bg-tertiary: #1e293b;   /* slate-800 */
          --color-bg-hover: #334155;      /* slate-700 */

          /* Text Colors for Dark Theme */
          --color-text-primary: #f8fafc;   /* slate-50 */
          --color-text-secondary: #e2e8f0; /* slate-200 */
          --color-text-muted: #94a3b8;     /* slate-400 */
          --color-text-disabled: #64748b;  /* slate-500 */

          /* Border Colors */
          --color-border-primary: #334155;  /* slate-700 */
          --color-border-secondary: #475569; /* slate-600 */

          /* Status Colors */
          --color-success: #10b981;  /* green-500 */
          --color-warning: #f59e0b;  /* amber-500 */
          --color-error: #ef4444;    /* red-500 */
          --color-info: #3b82f6;     /* blue-500 */

          /* Shadows for Dark Theme */
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.7);

          /* Premium Gradient Overlays */
          --gradient-primary: linear-gradient(135deg, #0047FF 0%, #00BFA6 100%);
          --gradient-dark: linear-gradient(180deg, #020617 0%, #0f172a 100%);
        }

        /* Smooth scrolling for contractor portal */
        .contractor-theme {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for dark theme */
        .contractor-theme ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .contractor-theme ::-webkit-scrollbar-track {
          background: var(--color-bg-secondary);
        }

        .contractor-theme ::-webkit-scrollbar-thumb {
          background: var(--color-border-primary);
          border-radius: 5px;
        }

        .contractor-theme ::-webkit-scrollbar-thumb:hover {
          background: var(--color-border-secondary);
        }
      `}</style>

      {/* Header - Fixed at top */}
      <ContractorHeader />

      {/* Main Content Area - Flexible grow to fill space */}
      <main className="flex-1 w-full">
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* Footer - Pinned at bottom */}
      <ContractorFooter />
    </div>
  )
}
