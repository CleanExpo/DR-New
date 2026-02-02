import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIImageEnhancementDashboard } from '@/components/admin/AIImageEnhancementDashboard';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'AI Image Enhancement - Admin Dashboard',
  description: 'Generate E.E.A.T.-optimized descriptions for inspection photos using AI',
};

export default async function AIEnhancementPage() {
  // 1. Check authentication
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // 2. Check authorization (ADMIN or SUPER_ADMIN only)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      userType: true,
      name: true,
      email: true,
    },
  });

  if (!user || (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN')) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIImageEnhancementDashboard />
      </div>
    </div>
  );
}
