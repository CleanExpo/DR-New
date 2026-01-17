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
import { AIChatWidget } from '@/components/ai';

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

  // Map user type
  const userType = session.user.userType === 'CONTRACTOR'
    ? 'contractor'
    : session.user.userType === 'ADMIN'
    ? 'admin'
    : 'homeowner';

  // The user is authenticated and can access dashboard
  return (
    <>
      {children}
      {/* AI Support Chat Widget */}
      <AIChatWidget
        userId={session.user.id}
        userType={userType}
      />
    </>
  );
}
