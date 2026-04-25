/**
 * DR-757: Next.js App Router error boundary for the admin dashboard.
 *
 * Any unhandled throw inside the admin page (including the four concurrent
 * Promise.all() data-fetches) will be caught here instead of crashing the
 * entire page to a blank screen. The operator sees a clear error message
 * and a "Try again" button that re-mounts the segment.
 */
'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminDashboardError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    // Log to console so the error shows up in server/Sentry logs
    console.error('[AdminDashboard] Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard failed to load</h1>
          <p className="text-gray-400 text-sm">
            {error.message || 'An unexpected error occurred while loading the admin dashboard.'}
          </p>
          {error.digest && (
            <p className="text-gray-600 text-xs mt-1">Error ID: {error.digest}</p>
          )}
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
