'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Briefcase,
  FileText,
  Activity,
} from 'lucide-react';

const analyticsNavItems = [
  {
    label: 'Dashboard',
    href: '/admin/analytics',
    icon: LayoutDashboard,
  },
  {
    label: 'Revenue',
    href: '/admin/analytics/revenue',
    icon: DollarSign,
  },
  {
    label: 'Contractors',
    href: '/admin/analytics/contractors',
    icon: Users,
  },
  {
    label: 'Jobs',
    href: '/admin/analytics/jobs',
    icon: Briefcase,
  },
  {
    label: 'Reports',
    href: '/admin/analytics/reports',
    icon: FileText,
  },
  {
    label: 'Real-time',
    href: '/admin/analytics/realtime',
    icon: Activity,
  },
];

function AnalyticsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-700 mb-6">
      {analyticsNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-6">
      <AnalyticsNav />
      {children}
    </div>
  );
}
