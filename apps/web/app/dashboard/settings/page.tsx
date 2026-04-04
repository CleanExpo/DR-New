/**
 * Dashboard Settings Page
 *
 * Hub for all user settings including:
 * - Notification preferences
 * - Security settings
 * - Account management
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Shield,
  User,
  ChevronRight,
  Loader2,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsLink {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const settingsLinks: SettingsLink[] = [
  {
    title: 'Notifications',
    description: 'Manage email, push, and SMS notification preferences',
    href: '/dashboard/settings/notifications',
    icon: <Bell className="h-6 w-6" />,
  },
  {
    title: 'Security',
    description: 'Password, two-factor authentication, and login history',
    href: '/dashboard/settings/security',
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: 'Profile',
    description: 'Update your personal information and preferences',
    href: '/dashboard/settings/profile',
    icon: <User className="h-6 w-6" />,
  },
];

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard/settings');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Links */}
      <div className="space-y-4">
        {settingsLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-gray-400">
                      {link.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {link.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Account Info */}
      {session?.user && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-400">Email</span>
              <span className="font-medium">{session.user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-400">Name</span>
              <span className="font-medium">{session.user.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Account Type</span>
              <span className="font-medium capitalize">
                {session.user.userType?.toLowerCase() || 'User'}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
