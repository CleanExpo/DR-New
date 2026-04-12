/**
 * Request Submitted Confirmation Page
 */

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Request Submitted | Disaster Recovery Australia',
  description: 'Your service request has been submitted successfully.',
}

export default async function RequestSubmittedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Request Submitted!
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Thank you for your submission. A qualified contractor in your area
            will contact you via email shortly.
          </p>

          {params.id && (
            <p className="text-sm text-slate-500 mb-8">
              Reference: <span className="font-mono">{params.id}</span>
            </p>
          )}

          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-blue-900 mb-2">What happens next?</h2>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• We match your request with contractors in your area</li>
              <li>• A contractor will email you directly with a quote</li>
              <li>• You choose the best option for your needs</li>
            </ul>
          </div>

          {/* RestoreAssist Trust Signal */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-teal-900 mb-2">Professional documentation included</h2>
            <p className="text-sm text-teal-800 mb-3">
              Your NRPG contractor will use <strong>RestoreAssist</strong> to document all
              damage — creating the moisture maps, scope of works, and photographic evidence
              your insurer needs to process your claim without delays.
            </p>
            <ul className="text-sm text-teal-800 space-y-1 mb-3">
              <li>✓ IICRC-standard moisture mapping</li>
              <li>✓ Scope of works accepted by all major Australian insurers</li>
              <li>✓ Timestamped photo evidence</li>
            </ul>
            <Link href="/restore-assist" className="text-sm text-teal-700 hover:text-teal-900 underline font-medium">
              Learn how RestoreAssist protects your claim →
            </Link>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>

            <p className="text-sm text-slate-500">
              Questions? Contact{' '}
              <a href="/contact" className="text-blue-600 hover:underline">
                our support team online
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
