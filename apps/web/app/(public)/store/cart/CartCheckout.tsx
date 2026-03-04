'use client'

/**
 * NRPG Store — Cart & Checkout (Client Component)
 *
 * Handles:
 *  - Cart line items with quantity controls
 *  - Order summary sidebar
 *  - Checkout form (name, email, address)
 *  - POST to /api/store/checkout
 *  - Success + empty-cart states
 */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/store/cart'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatAUD(price: number): string {
  return `$${price.toFixed(2)}`
}

const AUSTRALIAN_STATES = [
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NSW', label: 'New South Wales' },
  { value: 'NT',  label: 'Northern Territory' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA',  label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'WA',  label: 'Western Australia' },
]

// ---------------------------------------------------------------------------
// Form field component
// ---------------------------------------------------------------------------

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-black uppercase tracking-widest text-white/40"
      >
        {label}
        {required && <span className="text-teal-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full bg-[#0a0a0a] border border-white/10 text-white text-sm px-3 py-2.5 rounded-sm placeholder:text-white/20 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-colors duration-200'

// ---------------------------------------------------------------------------
// Empty cart
// ---------------------------------------------------------------------------

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32 gap-6"
    >
      <div className="p-6 border border-white/10 rounded-sm text-white/20">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-2">
          Your cart is empty
        </h2>
        <p className="text-white/20 text-xs">Add some NRPG gear to get started.</p>
      </div>
      <Link
        href="/store"
        className="text-[11px] font-black uppercase tracking-widest text-[#050505] bg-teal-500 hover:bg-teal-400 px-6 py-3 rounded-sm transition-colors duration-200"
      >
        Browse the Store
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Success state
// ---------------------------------------------------------------------------

function OrderSuccess({ orderId, total }: { orderId: string; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center py-24 gap-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        className="w-20 h-20 rounded-sm bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center"
      >
        <svg className="w-10 h-10 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
          Order Placed!
        </h2>
        <p className="text-white/40 text-sm max-w-md">
          Your NRPG order has been submitted for fulfilment. You will receive a confirmation email
          within 24 hours.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 border border-white/10 bg-white/5 px-8 py-4 rounded-sm">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
          Order Reference
        </span>
        <span className="text-teal-400 font-mono font-bold text-lg">{orderId}</span>
        <span className="text-white/40 text-sm mt-1">Total: {formatAUD(total)} AUD</span>
      </div>

      <p className="text-white/20 text-xs">
        Questions? Email support@disasterrecovery.com.au
      </p>

      <Link
        href="/store"
        className="text-[11px] font-black uppercase tracking-widest text-[#050505] bg-teal-500 hover:bg-teal-400 px-6 py-3 rounded-sm transition-colors duration-200"
      >
        Continue Shopping
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  address: string
  suburb: string
  state: string
  postcode: string
}

const EMPTY_FORM: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  suburb: '',
  state: '',
  postcode: '',
}

export default function CartCheckout() {
  const { cart, hydrated, remove, update, clear, total } = useCart()
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ orderId: string; total: number } | null>(null)

  // Don't render until client-side cart is hydrated
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-6 h-6 border border-teal-500/50 border-t-teal-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <OrderSuccess orderId={success.orderId} total={success.total} />
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyCart />
        </div>
      </div>
    )
  }

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.suburb || !form.state || !form.postcode) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        items: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variant ?? 'standard',
          quantity: item.quantity,
        })),
        recipient: {
          name: `${form.firstName} ${form.lastName}`,
          address: form.address,
          city: form.suburb,
          state: form.state,
          postcode: form.postcode,
          country: 'AU' as const,
          email: form.email,
        },
      }

      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error ?? 'Checkout failed. Please try again.')
        setSubmitting(false)
        return
      }

      clear()
      setSuccess({
        orderId: data.externalId ?? data.orderId ?? 'NRPG-ORDER',
        total: data.totalAUD ?? total,
      })
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const shippingNote = 'Calculated at checkout'

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Page header */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-white">Your Cart</h1>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">
              {cart.items.length} line item{cart.items.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/store"
            className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-teal-400 border border-white/10 hover:border-teal-500/30 px-4 py-2 rounded-sm transition-all duration-200"
          >
            ← Back to Store
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* ---------------------------------------------------------------- */}
          {/* LEFT: Cart items + checkout form                                 */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Line items */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">
                Items
              </h2>
              <div className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                  {cart.items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.variant ?? 'default'}`}
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-4 p-4 border border-white/10 bg-white/[0.02] rounded-sm hover:border-white/20 transition-colors duration-200"
                    >
                      {/* Initials avatar */}
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-sm flex items-center justify-center">
                        <span className="text-teal-400 text-sm font-black">
                          {item.name.split(/[\s-]+/).map((w) => w[0]).slice(0, 2).join('')}
                        </span>
                      </div>

                      {/* Name + variant */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold leading-snug truncate">
                          {item.name}
                        </p>
                        {item.variantLabel && (
                          <p className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">
                            {item.variantLabel}
                          </p>
                        )}
                        <p className="text-teal-400 font-mono text-sm font-bold mt-1">
                          {formatAUD(item.price)} × {item.quantity} = {formatAUD(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-0 border border-white/15 rounded-sm flex-shrink-0">
                        <button
                          onClick={() => update(item.productId, item.quantity - 1, item.variant)}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 border-r border-white/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-white text-sm font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => update(item.productId, item.quantity + 1, item.variant)}
                          disabled={item.quantity >= 10}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 border-l border-white/10 disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => remove(item.productId, item.variant)}
                        className="flex-shrink-0 p-2 text-white/20 hover:text-[#FF4444] transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Checkout form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-5 flex items-center gap-3">
                  <span>Delivery Details</span>
                  <span className="flex-1 h-px bg-white/5" />
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" id="firstName" required>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleFieldChange}
                      placeholder="First name"
                      autoComplete="given-name"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Last Name" id="lastName" required>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleFieldChange}
                      placeholder="Last name"
                      autoComplete="family-name"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Email" id="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFieldChange}
                      placeholder="you@example.com.au"
                      autoComplete="email"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Street Address" id="address" required>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={form.address}
                      onChange={handleFieldChange}
                      placeholder="123 Main Street"
                      autoComplete="street-address"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Suburb" id="suburb" required>
                    <input
                      id="suburb"
                      name="suburb"
                      type="text"
                      value={form.suburb}
                      onChange={handleFieldChange}
                      placeholder="Suburb"
                      autoComplete="address-level2"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="State / Territory" id="state" required>
                    <select
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleFieldChange}
                      className={inputCls}
                      required
                    >
                      <option value="">Select state…</option>
                      {AUSTRALIAN_STATES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Postcode" id="postcode" required>
                    <input
                      id="postcode"
                      name="postcode"
                      type="text"
                      value={form.postcode}
                      onChange={handleFieldChange}
                      placeholder="0000"
                      autoComplete="postal-code"
                      maxLength={4}
                      pattern="[0-9]{4}"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <p className="text-white/20 text-[10px] uppercase tracking-widest">
                      Australia delivery only · All prices AUD inc. GST
                    </p>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#FF4444]/30 bg-[#FF4444]/5 px-4 py-3 rounded-sm"
                >
                  <p className="text-[#FF4444] text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                  submitting
                    ? 'bg-teal-500/40 text-[#050505]/60 cursor-wait'
                    : 'bg-teal-500 text-[#050505] hover:bg-teal-400 shadow-[0_0_16px_rgba(13,148,136,0.3)] hover:shadow-[0_0_28px_rgba(13,148,136,0.5)]'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Placing Order…
                  </span>
                ) : (
                  `Place Order — ${formatAUD(total)} AUD`
                )}
              </motion.button>
            </form>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* RIGHT: Order summary                                             */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:sticky lg:top-8">
            <div className="border border-white/10 bg-white/[0.02] rounded-sm p-6 flex flex-col gap-5">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-white/30">
                Order Summary
              </h2>

              {/* Line items summary */}
              <div className="flex flex-col gap-3">
                {cart.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variant ?? 'default'}`}
                    className="flex justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-white/70 text-xs truncate">{item.name}</p>
                      {item.variantLabel && (
                        <p className="text-white/30 text-[9px] uppercase tracking-widest">
                          {item.variantLabel}
                        </p>
                      )}
                    </div>
                    <span className="text-white/60 text-xs font-mono flex-shrink-0">
                      {formatAUD(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10" />

              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-widest">Subtotal</span>
                <span className="text-white text-sm font-mono font-semibold">{formatAUD(total)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-widest">Shipping</span>
                <span className="text-white/40 text-xs">{shippingNote}</span>
              </div>

              <div className="h-px bg-white/10" />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Total</span>
                <div className="text-right">
                  <span className="text-teal-400 text-2xl font-black font-mono">
                    {formatAUD(total)}
                  </span>
                  <p className="text-white/20 text-[9px] uppercase tracking-widest">AUD inc. GST</p>
                </div>
              </div>

              {/* Delivery estimate */}
              <div className="border border-teal-500/20 bg-teal-500/5 rounded-sm px-3 py-2.5">
                <p className="text-teal-400/80 text-[10px] uppercase tracking-widest">
                  Estimated delivery
                </p>
                <p className="text-white/50 text-xs mt-0.5">7–14 business days · Australia only</p>
              </div>

              <p className="text-white/20 text-[9px] uppercase tracking-widest text-center">
                Secure order · NRPG fulfilment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
