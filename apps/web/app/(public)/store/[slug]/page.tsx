/**
 * NRPG Store — Product Detail Page
 *
 * Dynamic route: /store/[slug]
 * Renders product info, variant selector, quantity selector, and Add to Cart.
 *
 * Design: Scientific Luxury — OLED black, teal accents, rounded-sm.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/printful/products'
import ProductDetail from './ProductDetail'

// ---------------------------------------------------------------------------
// Static params (SSG-friendly)
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found | NRPG Store',
    }
  }

  const categoryLabels: Record<string, string> = {
    workwear: 'Workwear',
    headwear: 'Headwear',
    accessories: 'Accessories',
    bundles: 'Bundles',
  }

  return {
    title: `${product.name} | NRPG Store`,
    description: `${product.description} Price: $${product.basePrice.toFixed(2)} AUD. Fast Australian delivery.`,
    keywords: [
      ...product.tags,
      'NRPG store',
      'disaster recovery gear',
      categoryLabels[product.category],
    ],
    openGraph: {
      title: `${product.name} — NRPG Store`,
      description: product.description,
      url: `https://disasterrecovery.com.au/store/${product.slug}`,
      type: 'website',
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) notFound()

  return <ProductDetail product={product} />
}
