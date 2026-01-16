'use client'

import React from 'react'
import { Button } from '@/src/design-system'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ContractorError({ error, reset }: ErrorProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-slate-800 p-4 border border-cyan-500/20">
            <svg
              className="h-12 w-12 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-400 mb-6">
          We apologise for the inconvenience. Please try again or contact support if the problem persists.
        </p>

        {/* Development Error Details */}
        {isDevelopment && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 rounded-lg text-left">
            <p className="text-sm font-semibold text-red-400 mb-2">Error Details:</p>
            <p className="text-xs text-red-300 font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-400 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/25"
          >
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = '/contractor')}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-slate-800 hover:border-cyan-400 px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Return to dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
