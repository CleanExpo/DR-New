/**
 * Dashboard Layout with Server-Side Authentication
 *
 * All dashboard pages are protected by server-side authentication check.
 * This prevents unauthenticated users from accessing dashboard content.
 */

import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Server-side authentication check
  const session = await getServerSession(authOptions);

  // Redirect unauthenticated users to login
  if (!session || !session.user) {
    redirect('/login');
  }

  // The user is authenticated and can access dashboard
  return <>{children}</>;
}
