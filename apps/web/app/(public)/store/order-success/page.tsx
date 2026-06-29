/**
 * NRPG Store — Order Success Page
 *
 * Stripe redirects here after a successful payment with ?session_id=...
 * Displays order confirmation and next steps.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmed | NRPG Store',
  description: 'Your NRPG store order has been placed. We will fulfil and dispatch it shortly.',
  robots: { index: false, follow: false },
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Order Confirmed</h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          Payment received. Your NRPG merchandise order is being prepared for dispatch.
          You will receive a confirmation email with tracking details once your order ships.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-sm p-6 mb-8 text-left">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
            What happens next
          </h2>
          <ol className="space-y-3 text-sm text-white/60">
            <li className="flex gap-3">
              <span className="text-teal-400 font-bold">1.</span>
              <span>Order is sent to our fulfilment partner (Printful) for production</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-400 font-bold">2.</span>
              <span>Your items are produced and quality checked (2–5 business days)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-400 font-bold">3.</span>
              <span>Dispatched via Australian Post — expected delivery within 7–14 business days</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/store"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-sm transition-colors text-sm"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-white/20 text-white/70 hover:text-white font-semibold rounded-sm transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-white/30">
          Questions? Email{' '}
          <a href="mailto:support@disasterrecovery.com.au" className="text-teal-400 hover:underline">
            support@disasterrecovery.com.au
          </a>
        </p>
      </div>
    </div>
  )
}
