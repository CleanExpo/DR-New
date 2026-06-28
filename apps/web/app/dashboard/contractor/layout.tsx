import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ContractorPortalLayout } from '@/components/portal';

interface ContractorDashboardLayoutProps {
  children: ReactNode;
}

export default async function ContractorDashboardLayout({ children }: ContractorDashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as unknown as { id?: string; email?: string | null; name?: string } | undefined;

  const sessionUserId = sessionUser?.id;
  const sessionUserEmail = sessionUser?.email?.toLowerCase().trim();

  if (!sessionUserId && !sessionUserEmail) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: sessionUserId ? { id: sessionUserId } : { email: sessionUserEmail! },
    select: { id: true, userType: true, name: true, isEmailVerified: true },
  });

  if (!user) {
    redirect('/login');
  }

  const allowed = user.userType === 'CONTRACTOR' || user.userType === 'ADMIN' || user.userType === 'SUPER_ADMIN';
  if (!allowed) {
    redirect('/dashboard');
  }

  // Contractors must verify their email before the contractor portal renders.
  // Staff roles (ADMIN/SUPER_ADMIN) are exempt — they are provisioned out of band.
  if (user.userType === 'CONTRACTOR' && !user.isEmailVerified) {
    redirect('/auth/verify-email');
  }

  // Get contractor firm name (use user name or default)
  const firmName = user.name || sessionUser?.name || 'Your Restoration Firm';

  return (
    <ContractorPortalLayout firmName={firmName} firmStatus="Growth Partner">
      {children}
    </ContractorPortalLayout>
  );
}

