'use client'

/**
 * NRPG Store — ProductCard
 *
 * Reusable product card for the store grid. Uses the Scientific Luxury
 * design system: OLED black, teal accents, single-pixel borders,
 * rounded-sm only.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { StoreProduct } from '@/lib/printful/products'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatAUD(price: number): string {
  return `$${price.toFixed(2)}`
}

const CATEGORY_LABELS: Record<StoreProduct['category'], string> = {
  workwear: 'Workwear',
  headwear: 'Headwear',
  accessories: 'Accessories',
  bundles: 'Bundles',
}

const CATEGORY_COLOURS: Record<StoreProduct['category'], string> = {
  workwear: 'text-[#00F5FF] border-[#00F5FF]/30 bg-[#00F5FF]/5',
  headwear: 'text-[#00FF88] border-[#00FF88]/30 bg-[#00FF88]/5',
  accessories: 'text-[#FFB800] border-[#FFB800]/30 bg-[#FFB800]/5',
  bundles: 'text-[#0d9488] border-teal-500/30 bg-teal-500/5',
}

// ---------------------------------------------------------------------------
// Placeholder SVG (inline, no external asset dependency)
// ---------------------------------------------------------------------------

function PlaceholderSvg({ name }: { name: string }) {
  const initials = name
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#050505" />
      <rect x="0" y="0" width="400" height="400" fill="none" stroke="#0d9488" strokeWidth="1" opacity="0.3" />
      <rect x="120" y="130" width="160" height="140" fill="none" stroke="#0d9488" strokeWidth="1.5" rx="2" />
      <text
        x="200" y="208"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="52"
        fill="#0d9488"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {initials}
      </text>
      <text
        x="200" y="310"
        fontFamily="system-ui, sans-serif"
        fontSize="11"
        fill="#4b5563"
        textAnchor="middle"
        letterSpacing="4"
      >
        NRPG STORE
      </text>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ProductCardProps {
  product: StoreProduct
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const categoryColour = CATEGORY_COLOURS[product.category]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative flex flex-col bg-[#050505] border border-white/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-teal-500/60 hover:shadow-[0_0_24px_rgba(13,148,136,0.15)] ${className}`}
    >
      {/* Featured badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#050505] bg-[#0d9488] px-2 py-0.5 rounded-sm">
            Featured
          </span>
        </div>
      )}

      {/* Product image */}
      <Link href={`/store/${product.slug}`} className="block">
        <div className="relative aspect-square w-full bg-[#0a0a0a] overflow-hidden">
          <PlaceholderSvg name={product.name} />
          {/* Hover teal overlay */}
          <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/5 transition-colors duration-300" />
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category badge */}
        <span
          className={`self-start text-[10px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-sm ${categoryColour}`}
        >
          {CATEGORY_LABELS[product.category]}
        </span>

        {/* Name */}
        <Link href={`/store/${product.slug}`}>
          <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-teal-400 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-teal-400 text-lg font-bold font-mono">
              {formatAUD(product.basePrice)}
            </span>
            <span className="text-white/30 text-xs ml-1">AUD</span>
          </div>

          <Link
            href={`/store/${product.slug}`}
            className="text-[10px] font-black uppercase tracking-widest text-[#050505] bg-[#0d9488] hover:bg-teal-400 px-3 py-1.5 rounded-sm transition-colors duration-200"
          >
            View
          </Link>
        </div>

        {/* Variant count hint */}
        {product.variants.length > 1 && (
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            {product.variants.length} variants available
          </p>
        )}
      </div>

      {/* Bottom border glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/0 group-hover:via-teal-500/60 to-transparent transition-all duration-500" />
    </motion.div>
  )
}
