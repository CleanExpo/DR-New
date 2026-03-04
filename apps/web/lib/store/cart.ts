/**
 * NRPG Store — Cart State Management
 *
 * Persists cart items to localStorage so they survive page navigation.
 * A React hook (`useCart`) provides reactive state synced to storage.
 *
 * All prices are AUD inc. GST.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CartItem {
  productId: string
  slug: string
  name: string
  /** AUD inc. GST — unit price */
  price: number
  quantity: number
  /** Selected variant id, e.g. "m", "one-size" */
  variant?: string
  /** Human-readable variant label, e.g. "M", "Natural" */
  variantLabel?: string
}

export interface Cart {
  items: CartItem[]
}

// ---------------------------------------------------------------------------
// Storage key
// ---------------------------------------------------------------------------

const CART_KEY = 'nrpg_store_cart'

// ---------------------------------------------------------------------------
// Pure helpers (no React)
// ---------------------------------------------------------------------------

export function getCart(): Cart {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return { items: [] }
    return JSON.parse(raw) as Cart
  } catch {
    return { items: [] }
  }
}

function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(item: CartItem): Cart {
  const cart = getCart()
  const existingIndex = cart.items.findIndex(
    (i) => i.productId === item.productId && i.variant === item.variant
  )

  if (existingIndex >= 0) {
    const updated = [...cart.items]
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: Math.min(10, updated[existingIndex].quantity + item.quantity),
    }
    const next = { items: updated }
    saveCart(next)
    return next
  }

  const next = { items: [...cart.items, { ...item, quantity: Math.min(10, item.quantity) }] }
  saveCart(next)
  return next
}

export function removeFromCart(productId: string, variant?: string): Cart {
  const cart = getCart()
  const next = {
    items: cart.items.filter(
      (i) => !(i.productId === productId && i.variant === variant)
    ),
  }
  saveCart(next)
  return next
}

export function updateQuantity(productId: string, qty: number, variant?: string): Cart {
  const cart = getCart()
  if (qty < 1) return removeFromCart(productId, variant)
  const next = {
    items: cart.items.map((i) =>
      i.productId === productId && i.variant === variant
        ? { ...i, quantity: Math.min(10, Math.max(1, qty)) }
        : i
    ),
  }
  saveCart(next)
  return next
}

export function clearCart(): Cart {
  const next: Cart = { items: [] }
  saveCart(next)
  return next
}

export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getCartItemCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCart(getCart())
    setHydrated(true)
  }, [])

  // Listen for storage events from other tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === CART_KEY) {
        setCart(getCart())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((item: CartItem) => {
    setCart(addToCart(item))
  }, [])

  const remove = useCallback((productId: string, variant?: string) => {
    setCart(removeFromCart(productId, variant))
  }, [])

  const update = useCallback((productId: string, qty: number, variant?: string) => {
    setCart(updateQuantity(productId, qty, variant))
  }, [])

  const clear = useCallback(() => {
    setCart(clearCart())
  }, [])

  const total = getCartTotal(cart)
  const itemCount = getCartItemCount(cart)

  return { cart, hydrated, add, remove, update, clear, total, itemCount }
}
