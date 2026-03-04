'use client'

/**
 * NRPG Store — Product Detail (Client Component)
 *
 * Handles variant selection, quantity, and Add to Cart interaction.
 */

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { StoreProduct, ProductVariant } from '@/lib/printful/products'
import { useCart } from '@/lib/store/cart'

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
// Product placeholder image (full-size)
// ---------------------------------------------------------------------------

function ProductPlaceholderLarge({ name }: { name: string }) {
  const initials = name
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="600" height="600" fill="#050505" />
      {/* Grid lines */}
      {[100, 200, 300, 400, 500].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#0d9488" strokeWidth="0.5" opacity="0.1" />
      ))}
      {[100, 200, 300, 400, 500].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} stroke="#0d9488" strokeWidth="0.5" opacity="0.1" />
      ))}
      {/* Centre box */}
      <rect x="160" y="180" width="280" height="240" fill="none" stroke="#0d9488" strokeWidth="1.5" rx="2" />
      {/* Corner ticks */}
      {[[160,180],[440,180],[160,420],[440,420]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="#0d9488" strokeWidth="1" />
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="#0d9488" strokeWidth="1" />
        </g>
      ))}
      {/* Initials */}
      <text
        x="300" y="308"
        fontFamily="system-ui, monospace"
        fontWeight="700"
        fontSize="80"
        fill="#0d9488"
        textAnchor="middle"
        dominantBaseline="central"
        letterSpacing="-2"
      >
        {initials}
      </text>
      {/* NRPG label */}
      <text
        x="300" y="480"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fill="#374151"
        textAnchor="middle"
        letterSpacing="6"
      >
        NRPG STORE
      </text>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ProductDetailProps {
  product: StoreProduct
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length === 1 ? product.variants[0] : null
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { add, itemCount, hydrated } = useCart()

  const unitPrice = product.basePrice + (selectedVariant?.priceAdjustment ?? 0)
  const lineTotal = unitPrice * quantity

  const hasVariants = product.variants.length > 1

  // Determine variant option key (size or colour)
  const variantOptionKey = product.variants[0]?.options
    ? Object.keys(product.variants[0].options)[0] ?? 'variant'
    : 'variant'

  function handleAddToCart() {
    if (hasVariants && !selectedVariant) return

    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      quantity,
      variant: selectedVariant?.id,
      variantLabel: selectedVariant?.name,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const canAdd = !hasVariants || selectedVariant !== null

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Back nav */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-teal-400 transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ---------------------------------------------------------------- */}
          {/* LEFT: Product image                                              */}
          {/* ---------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square w-full bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              <ProductPlaceholderLarge name={product.name} />
            </div>

            {/* Featured badge */}
            {product.featured && (
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#050505] bg-teal-500 px-3 py-1 rounded-sm">
                  Featured
                </span>
              </div>
            )}
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* RIGHT: Product info + purchase                                   */}
          {/* ---------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Category badge */}
            <span
              className={`self-start text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-sm ${CATEGORY_COLOURS[product.category]}`}
            >
              {CATEGORY_LABELS[product.category]}
            </span>

            {/* Name */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-teal-400 text-4xl font-black font-mono">
                {formatAUD(unitPrice)}
              </span>
              <span className="text-white/30 text-sm uppercase tracking-widest">AUD inc. GST</span>
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed text-sm border-l-2 border-teal-500/30 pl-4">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-white/25 border border-white/10 px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Separator */}
            <div className="h-px bg-white/10" />

            {/* Variant selector */}
            {hasVariants && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                  Select {variantOptionKey}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id
                    const displayLabel = variant.options[variantOptionKey] ?? variant.name
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.inStock}
                        className={`text-sm font-semibold px-4 py-2 rounded-sm border transition-all duration-200 min-w-[3rem] ${
                          !variant.inStock
                            ? 'opacity-30 cursor-not-allowed text-white/20 border-white/10'
                            : isSelected
                            ? 'bg-teal-500 text-[#050505] border-teal-500 shadow-[0_0_12px_rgba(13,148,136,0.4)]'
                            : 'text-white/70 border-white/20 hover:border-teal-500/50 hover:text-white bg-white/5'
                        }`}
                      >
                        {displayLabel}
                        {!variant.inStock && (
                          <span className="block text-[9px] uppercase tracking-widest mt-0.5">
                            Out of stock
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
                {hasVariants && !selectedVariant && (
                  <p className="text-[10px] text-[#FFB800] uppercase tracking-widest mt-2">
                    Please select a {variantOptionKey} to continue
                  </p>
                )}
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-0 border border-white/20 rounded-sm w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 border-r border-white/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>

                <span className="w-12 text-center text-white font-mono font-semibold text-sm">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 border-l border-white/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {quantity > 1 && (
                <p className="text-white/30 text-xs mt-2 font-mono">
                  Total: {formatAUD(lineTotal)} AUD
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!canAdd || added}
              whileTap={{ scale: 0.97 }}
              className={`relative w-full py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                added
                  ? 'bg-[#00FF88] text-[#050505] shadow-[0_0_24px_rgba(0,255,136,0.3)]'
                  : canAdd
                  ? 'bg-teal-500 text-[#050505] hover:bg-teal-400 shadow-[0_0_16px_rgba(13,148,136,0.3)] hover:shadow-[0_0_24px_rgba(13,148,136,0.5)]'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              {added ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart — {formatAUD(lineTotal)} AUD
                </span>
              )}
            </motion.button>

            {/* View cart link (once something is in cart) */}
            {hydrated && itemCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href="/store/cart"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm text-[11px] font-black uppercase tracking-widest text-teal-400 border border-teal-500/30 hover:bg-teal-500/5 transition-colors duration-200"
                >
                  View Cart ({itemCount} item{itemCount !== 1 ? 's' : ''})
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            )}

            {/* Delivery note */}
            <p className="text-white/25 text-[10px] uppercase tracking-widest text-center border-t border-white/10 pt-4">
              Free delivery on orders over $150 AUD · 7–14 business days · Australia only
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
