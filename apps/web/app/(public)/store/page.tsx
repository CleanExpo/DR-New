/**
 * NRPG Merch Store — Landing Page
 *
 * Sub Pillar page for the NRPG branded merchandise catalogue.
 * Fetches product data directly from the local catalogue (server component).
 *
 * Design: Scientific Luxury — OLED black, teal accents, rounded-sm only.
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { products } from '@/lib/printful/products'
import StoreLanding from './StoreLanding'

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'NRPG Store | Disaster Recovery Equipment & Branded Workwear',
  description:
    'Shop NRPG branded workwear, hi-vis gear, headwear, and accessories. Engineered for disaster recovery contractors. Fast Australian delivery. All prices AUD inc. GST.',
  keywords: [
    'NRPG merch',
    'NRPG store',
    'disaster recovery workwear',
    'hi-vis polo australia',
    'branded contractor gear',
    'safety workwear australia',
    'NRPG branded merchandise',
    'restoration contractor clothing',
  ],
  openGraph: {
    title: 'NRPG Store | Branded Workwear & Equipment',
    description:
      'Official NRPG merchandise. Hi-vis polos, caps, accessories and bundles for disaster recovery professionals.',
    url: 'https://disasterrecovery.com.au/store',
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Page (Server Component — data fetching)
// ---------------------------------------------------------------------------

export default function StorePage() {
  // Data sourced directly from local catalogue — no fetch latency.
  return (
    <Suspense fallback={<StoreSkeleton />}>
      <StoreLanding products={products} />
    </Suspense>
  )
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function StoreSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] animate-pulse">
      <div className="h-64 bg-white/5" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  )
}
