'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, LogOut } from 'lucide-react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  const router = useRouter()

  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  const isSessionError = error?.message?.includes('session') ||
                        error?.message?.includes('auth') ||
                        error?.message?.includes('Authentication')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {isSessionError ? 'Session Error' : 'Dashboard Error'}
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 text-center mb-6">
          {isSessionError
            ? 'Your session could not be initialized. Please log in again to continue.'
            : 'An error occurred while loading the dashboard. Please try again.'}
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 rounded p-3 mb-6 text-xs text-gray-700 overflow-auto max-h-24">
            <p className="font-mono">{error?.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {isSessionError ? (
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Go to Login
            </button>
          ) : (
            <>
              <button
                onClick={reset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
              >
                Go Home
              </button>
            </>
          )}
        </div>

        {/* Support Text */}
        <p className="text-sm text-gray-500 text-center mt-6">
          If the problem persists, please <a href="/contact" className="underline text-blue-600 hover:text-blue-700">contact support online</a>
        </p>
      </div>
    </div>
  )
}
