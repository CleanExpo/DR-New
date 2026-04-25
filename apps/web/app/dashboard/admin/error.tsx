'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Route-segment error boundary for the admin dashboard. */
export default function AdminDashboardError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('[Admin dashboard error]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-white text-center mb-2">
          Admin dashboard error
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-center text-sm mb-6">
          Something went wrong while loading the admin dashboard. Your data is safe — this is a
          display issue only.
        </p>

        {/* Dev-mode detail */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="bg-gray-900 rounded-lg p-3 mb-6 text-xs font-mono text-red-300 overflow-auto max-h-24">
            {error.message}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white font-medium py-2.5 px-4 rounded-lg transition"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2.5 px-4 rounded-lg transition"
          >
            <LayoutDashboard className="h-4 w-4" />
            Back to dashboard
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          If this keeps happening, please{' '}
          <a href="/contact" className="underline text-[#00BFA6] hover:text-[#00BFA6]/80">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
