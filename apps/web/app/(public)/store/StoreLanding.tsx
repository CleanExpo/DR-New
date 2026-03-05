'use client'

/**
 * NRPG Store — Interactive Landing (Client Component)
 *
 * Handles category filter tabs and animated product grid.
 * Receives product data as props from the server component.
 */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { StoreProduct } from '@/lib/printful/products'
import ProductCard from '@/components/store/ProductCard'
import { useCart } from '@/lib/store/cart'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FilterCategory = 'all' | StoreProduct['category']

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Workwear', value: 'workwear' },
  { label: 'Headwear', value: 'headwear' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Bundles', value: 'bundles' },
]

// Pre-computed category counts — single O(n) pass avoids repeated filter calls in render loop
function buildCategoryCounts(products: StoreProduct[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }
  return counts
}

// ---------------------------------------------------------------------------
// Hero decorative line
// ---------------------------------------------------------------------------

function HeroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Vertical teal grid lines */}
      {[15, 30, 50, 70, 85].map((left) => (
        <div
          key={left}
          className="absolute top-0 bottom-0 w-px bg-teal-500/5"
          style={{ left: `${left}%` }}
        />
      ))}
      {/* Horizontal lines */}
      {[25, 60].map((top) => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px bg-teal-500/5"
          style={{ top: `${top}%` }}
        />
      ))}
      {/* Corner accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Cart indicator
// ---------------------------------------------------------------------------

function CartIndicator() {
  const { itemCount, hydrated } = useCart()
  if (!hydrated || itemCount === 0) return null

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-sm bg-teal-500 text-[#050505] text-[10px] font-black flex items-center justify-center"
    >
      {itemCount > 9 ? '9+' : itemCount}
    </motion.span>
  )
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface StoreLandingProps {
  products: StoreProduct[]
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StoreLanding({ products }: StoreLandingProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const { itemCount, hydrated } = useCart()

  // Single O(n) pass — no per-tab filter calls inside the render loop
  const categoryCounts = buildCategoryCounts(products)

  // Single O(n) pass — pre-build id→product map to avoid three separate find() calls below
  const productById = new Map(products.map((p) => [p.id, p]))
  const bronzePack = productById.get('bronze-pack') ?? null
  const silverPack = productById.get('silver-pack') ?? null
  const goldPack = productById.get('gold-pack') ?? null

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter)

  const totalItems = products.length

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-white/10">
        <HeroGrid />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="mb-6"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 border border-teal-500/30 bg-teal-500/5 px-3 py-1 rounded-sm">
              Official NRPG Merchandise
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none mb-4"
          >
            Gear Up.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#00F5FF]">
              Stand Out.
            </span>
            <br />
            Rep the Brand.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-white/50 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Premium NRPG branded workwear and accessories engineered for disaster recovery
            professionals. Hi-vis compliant, site-ready, and built to last.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-wrap gap-6"
          >
            {[
              { label: 'Products', value: totalItems },
              { label: 'Fast AU Delivery', value: '7–14 days' },
              { label: 'Prices inc. GST', value: 'AUD' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-teal-400 text-2xl font-black font-mono">{stat.value}</span>
                <span className="text-white/30 text-[10px] uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Cart link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8"
          >
            <Link
              href="/store/cart"
              className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-teal-400 border border-white/10 hover:border-teal-500/40 bg-white/5 hover:bg-teal-500/5 px-4 py-2 rounded-sm transition-[color,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart</span>
              {hydrated && itemCount > 0 && (
                <span className="ml-1 h-5 px-1.5 rounded-sm bg-teal-500 text-[#050505] text-[10px] font-black flex items-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FILTER TABS + PRODUCT GRID                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-sm border transition-[background-color,border-color,color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
                  isActive
                    ? 'bg-teal-500 text-[#050505] border-teal-500 shadow-[0_0_12px_rgba(13,148,136,0.4)]'
                    : 'text-white/50 border-white/10 bg-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
                {tab.value !== 'all' && (
                  <span className={`ml-2 text-[9px] ${isActive ? 'text-[#050505]/70' : 'text-white/20'}`}>
                    {categoryCounts[tab.value] ?? 0}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Result count */}
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-6">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' ? ` in ${activeFilter}` : ''}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm uppercase tracking-widest">
              No products in this category.
            </p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CERTIFICATION PACKS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section header */}
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/5 px-3 py-1 rounded-sm">
            Exclusive Achievement Reward
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
            NRPG Certification Packs
          </h2>
          <p className="mt-2 text-white/40 text-sm max-w-lg leading-relaxed">
            Awarded on achieving Certified Specialist, Professional, or Expert status. Each pack reflects your tier — earned, not purchased.
          </p>
        </div>

        {/* Three tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Bronze */}
          {bronzePack ? (
              <Link
                href={`/store/${bronzePack.slug}`}
                className="group relative flex flex-col rounded-sm border border-[#cd7f32]/30 bg-gradient-to-b from-[#cd7f32]/5 to-transparent hover:border-[#cd7f32]/60 hover:from-[#cd7f32]/10 transition-[border-color,background] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
              >
                {/* Tier accent top bar */}
                <div className="h-0.5 w-full rounded-t-sm bg-gradient-to-r from-[#cd7f32] via-[#a0522d] to-transparent" />
                {/* Mockup image */}
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <img
                    src={bronzePack.mockupImage}
                    alt={bronzePack.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                  />
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#FFB800]">
                    Bronze — Certified Specialist
                  </span>
                  <h3 className="text-white font-black text-sm uppercase tracking-wide leading-tight">
                    {bronzePack.name}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed flex-1">
                    {bronzePack.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#cd7f32]/20">
                    <span className="text-[#cd7f32] font-black text-lg font-mono">
                      ${bronzePack.basePrice}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-[#cd7f32] transition-[color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]">
                      View Pack →
                    </span>
                  </div>
                </div>
              </Link>
          ) : null}

          {/* Silver */}
          {silverPack ? (
              <Link
                href={`/store/${silverPack.slug}`}
                className="group relative flex flex-col rounded-sm border border-[#c0c0c0]/30 bg-gradient-to-b from-[#c0c0c0]/5 to-transparent hover:border-[#c0c0c0]/60 hover:from-[#c0c0c0]/10 transition-[border-color,background] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
              >
                <div className="h-0.5 w-full rounded-t-sm bg-gradient-to-r from-[#c0c0c0] via-[#909090] to-transparent" />
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <img
                    src={silverPack.mockupImage}
                    alt={silverPack.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00F5FF]">
                    Silver — Certified Professional
                  </span>
                  <h3 className="text-white font-black text-sm uppercase tracking-wide leading-tight">
                    {silverPack.name}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed flex-1">
                    {silverPack.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#c0c0c0]/20">
                    <span className="text-[#c0c0c0] font-black text-lg font-mono">
                      ${silverPack.basePrice}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-[#c0c0c0] transition-[color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]">
                      View Pack →
                    </span>
                  </div>
                </div>
              </Link>
          ) : null}

          {/* Gold */}
          {goldPack ? (
              <Link
                href={`/store/${goldPack.slug}`}
                className="group relative flex flex-col rounded-sm border border-[#ffd700]/30 bg-gradient-to-b from-[#ffd700]/5 to-transparent hover:border-[#ffd700]/60 hover:from-[#ffd700]/10 transition-[border-color,background] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
              >
                <div className="h-0.5 w-full rounded-t-sm bg-gradient-to-r from-[#ffd700] via-[#c8a000] to-transparent" />
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <img
                    src={goldPack.mockupImage}
                    alt={goldPack.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00FF88]">
                    Gold — Certified Expert / Master
                  </span>
                  <h3 className="text-white font-black text-sm uppercase tracking-wide leading-tight">
                    {goldPack.name}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed flex-1">
                    {goldPack.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#ffd700]/20">
                    <span className="text-[#ffd700] font-black text-lg font-mono">
                      ${goldPack.basePrice}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-[#ffd700] transition-[color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]">
                      View Pack →
                    </span>
                  </div>
                </div>
              </Link>
          ) : null}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INFO BAND                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-white/10 bg-white/[0.02] py-12 mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: 'Printful Fulfilment',
                body: 'Orders fulfilled and shipped directly. 7–14 business day delivery across Australia.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Safety Compliant',
                body: 'Hi-vis gear meets AS/NZS 4602.1 day-use requirements. PPE compliant where specified.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Support',
                body: 'Questions? Contact us online — we respond within 24 hours.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <div className="text-teal-400 p-3 border border-teal-500/20 bg-teal-500/5 rounded-sm">
                  {item.icon}
                </div>
                <h3 className="text-white text-sm font-semibold">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
