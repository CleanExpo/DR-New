'use client'

import React from 'react'
import { Button } from '@/src/design-system'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function PublicError({ error, reset }: ErrorProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-emerald-100 p-4">
            <svg
              className="h-12 w-12 text-emerald-600"
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
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-600 mb-6">
          We apologise for the inconvenience. Please try again or contact support if the problem persists.
        </p>

        {/* Development Error Details */}
        {isDevelopment && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-semibold text-red-800 mb-2">Error Details:</p>
            <p className="text-xs text-red-700 font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-[background-color,color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
          >
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-2.5 rounded-lg font-medium transition-[background-color,color,border-color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
          >
            Return home
          </Button>
        </div>
      </div>
    </div>
  )
}
