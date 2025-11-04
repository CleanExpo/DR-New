import { ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  BarChart3,
  FileStack
} from 'lucide-react';

export default function AdminOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  // In production, fetch pending count from API
  const pendingCount = 0;

  const navItems = [
    {
      href: '/admin/onboarding',
      label: 'Pending Applications',
      icon: Users,
      badge: pendingCount
    },
    {
      href: '/admin/onboarding/bulk',
      label: 'Bulk Actions',
      icon: FileStack
    },
    {
      href: '/admin/onboarding/analytics',
      label: 'Analytics',
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Contractor Onboarding
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Review and verify contractor applications
              </p>
            </div>

            {pendingCount > 0 && (
              <Badge variant="destructive" className="text-base px-4 py-2">
                {pendingCount} Pending
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
