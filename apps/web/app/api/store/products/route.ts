/**
 * GET /api/store/products
 *
 * Public endpoint — returns the NRPG merchandise catalogue.
 *
 * Query params:
 *   ?category=workwear   — filter by category
 *   ?slug=nrpg-hoodie    — return a single product by slug
 *   ?featured=true       — only featured products
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  products,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  type StoreProduct,
} from '@/lib/printful/products'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug = searchParams.get('slug')
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')

  // Single product by slug
  if (slug) {
    const product = getProductBySlug(slug)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ product })
  }

  // Filter by category
  let result: StoreProduct[] = products

  if (category) {
    const validCategories = ['workwear', 'headwear', 'accessories', 'bundles'] as const
    if (!validCategories.includes(category as (typeof validCategories)[number])) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      )
    }
    result = getProductsByCategory(category as StoreProduct['category'])
  }

  // Filter featured — single branch (the previous else-if was a dead branch:
  // "featured === 'true' && !category" can never be reached after the first condition)
  if (featured === 'true') {
    result = result.filter((p) => p.featured)
  }

  return NextResponse.json({ products: result, total: result.length })
}
