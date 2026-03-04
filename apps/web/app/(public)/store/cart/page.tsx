/**
 * NRPG Store — Cart & Checkout Page
 *
 * Shows cart line items, order summary, checkout form, and handles
 * the POST to /api/store/checkout.
 *
 * Design: Scientific Luxury — OLED black, teal accents, rounded-sm.
 */

import type { Metadata } from 'next'
import CartCheckout from './CartCheckout'

export const metadata: Metadata = {
  title: 'Cart | NRPG Store',
  description: 'Review your NRPG merchandise order and complete checkout.',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return <CartCheckout />
}
