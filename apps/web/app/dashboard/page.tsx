'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Redirect to appropriate dashboard based on user type
  useEffect(() => {
    if (user && user.userType === 'CONTRACTOR') {
      router.push('/dashboard/contractor');
    } else if (user && user.userType !== 'CONTRACTOR') {
      router.push('/dashboard/client');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6] mx-auto mb-4" />
          <p className="text-gray-300 text-sm">Initializing session...</p>
          <p className="text-gray-400 text-xs mt-2">If this takes more than 10 seconds, you'll be redirected to login</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
