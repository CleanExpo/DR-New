/**
 * NRPG Store — Product Catalogue
 *
 * Static product definitions for the NRPG branded merchandise store.
 * All prices are in AUD inclusive of GST.
 * Printful product IDs reference their catalogue for sync.
 */

export interface ProductVariant {
  id: string
  name: string
  sku: string
  /** Additional cost on top of base price (AUD inc. GST) */
  priceAdjustment: number
  options: Record<string, string>
  inStock: boolean
}

export interface StoreProduct {
  id: string
  slug: string
  name: string
  description: string
  category: 'workwear' | 'headwear' | 'accessories' | 'bundles'
  /** Printful catalog product ID for sync */
  printfulProductId?: number
  /** AUD inc. GST */
  basePrice: number
  variants: ProductVariant[]
  tags: string[]
  featured: boolean
  /** Path to /store/[name].svg mockup */
  mockupImage: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sizesSmallToXXL: ProductVariant[] = ['S', 'M', 'L', 'XL', 'XXL'].map((size) => ({
  id: size.toLowerCase(),
  name: size,
  sku: '',
  priceAdjustment: 0,
  options: { size },
  inStock: true,
}))

function withSku(prefix: string, variants: ProductVariant[]): ProductVariant[] {
  return variants.map((v) => ({ ...v, sku: `${prefix}-${v.id}`.toUpperCase() }))
}

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

export const products: StoreProduct[] = [
  {
    id: 'nrpg-hivis-polo',
    slug: 'nrpg-hivis-polo',
    name: 'NRPG Hi-Vis Polo',
    description:
      'High-visibility polo with reflective strips and embroidered NRPG branding. Compliant with AS/NZS 4602.1 for day use. Moisture-wicking polyester blend.',
    category: 'workwear',
    printfulProductId: 380,
    basePrice: 65,
    variants: withSku('HIVPOLO', sizesSmallToXXL),
    tags: ['hi-vis', 'safety', 'workwear', 'polo'],
    featured: true,
    mockupImage: '/store/nrpg-hivis-polo.svg',
  },
  {
    id: 'nrpg-work-shirt',
    slug: 'nrpg-work-shirt',
    name: 'NRPG Work Shirt (Embroidered)',
    description:
      'Professional cotton drill work shirt with embroidered NRPG crest on left chest. Durable construction suited to field and office wear.',
    category: 'workwear',
    printfulProductId: 438,
    basePrice: 55,
    variants: withSku('WRKSHRT', sizesSmallToXXL),
    tags: ['work-shirt', 'embroidered', 'professional'],
    featured: false,
    mockupImage: '/store/nrpg-work-shirt.svg',
  },
  {
    id: 'nrpg-safety-vest',
    slug: 'nrpg-safety-vest',
    name: 'NRPG Safety Vest',
    description:
      'Lightweight hi-vis safety vest with printed NRPG logo on the back. Features reflective tape and front zip closure. One size fits most over workwear.',
    category: 'workwear',
    printfulProductId: 382,
    basePrice: 45,
    variants: withSku('SAFVEST', [
      { id: 'one-size', name: 'One Size', sku: '', priceAdjustment: 0, options: { size: 'One Size' }, inStock: true },
    ]),
    tags: ['safety', 'vest', 'hi-vis'],
    featured: false,
    mockupImage: '/store/nrpg-safety-vest.svg',
  },
  {
    id: 'nrpg-cap',
    slug: 'nrpg-cap',
    name: 'NRPG Cap (Structured, Teal)',
    description:
      'Structured six-panel cap in NRPG teal with embroidered logo. Adjustable snapback closure. Pre-curved brim.',
    category: 'headwear',
    printfulProductId: 206,
    basePrice: 38,
    variants: withSku('CAP', [
      { id: 'one-size', name: 'One Size', sku: '', priceAdjustment: 0, options: { size: 'One Size' }, inStock: true },
    ]),
    tags: ['cap', 'teal', 'branded'],
    featured: true,
    mockupImage: '/store/nrpg-cap.svg',
  },
  {
    id: 'nrpg-beanie',
    slug: 'nrpg-beanie',
    name: 'NRPG Beanie',
    description:
      'Warm acrylic knit beanie with embroidered NRPG logo. Perfect for early-morning site starts in cooler months.',
    category: 'headwear',
    printfulProductId: 228,
    basePrice: 32,
    variants: withSku('BEANIE', [
      { id: 'one-size', name: 'One Size', sku: '', priceAdjustment: 0, options: { size: 'One Size' }, inStock: true },
    ]),
    tags: ['beanie', 'winter', 'warm'],
    featured: false,
    mockupImage: '/store/nrpg-beanie.svg',
  },
  {
    id: 'nrpg-sticker-pack',
    slug: 'nrpg-sticker-pack',
    name: 'NRPG Sticker Pack (5x Stickers)',
    description:
      'Pack of five weatherproof vinyl stickers featuring NRPG branding and disaster-recovery motifs. Great for hard hats, toolboxes, and laptops.',
    category: 'accessories',
    printfulProductId: 358,
    basePrice: 18,
    variants: withSku('STICKER', [
      { id: 'standard', name: 'Standard', sku: '', priceAdjustment: 0, options: {}, inStock: true },
    ]),
    tags: ['stickers', 'vinyl', 'weatherproof'],
    featured: false,
    mockupImage: '/store/nrpg-sticker-pack.svg',
  },
  {
    id: 'nrpg-lanyard',
    slug: 'nrpg-lanyard',
    name: 'NRPG Lanyard + ID Holder',
    description:
      'Polyester lanyard in NRPG teal with detachable buckle and clear ID card holder. Includes safety breakaway clip.',
    category: 'accessories',
    printfulProductId: undefined,
    basePrice: 22,
    variants: withSku('LANYARD', [
      { id: 'standard', name: 'Standard', sku: '', priceAdjustment: 0, options: {}, inStock: true },
    ]),
    tags: ['lanyard', 'id-holder', 'site-access'],
    featured: false,
    mockupImage: '/store/nrpg-lanyard.svg',
  },
  {
    id: 'nrpg-tote-bag',
    slug: 'nrpg-tote-bag',
    name: 'NRPG Tote Bag',
    description:
      'Heavyweight cotton canvas tote with screen-printed NRPG logo. Internal pocket for phone or keys. Reinforced stitching.',
    category: 'accessories',
    printfulProductId: 358,
    basePrice: 35,
    variants: withSku('TOTE', [
      { id: 'natural', name: 'Natural', sku: '', priceAdjustment: 0, options: { colour: 'Natural' }, inStock: true },
      { id: 'black', name: 'Black', sku: '', priceAdjustment: 0, options: { colour: 'Black' }, inStock: true },
    ]),
    tags: ['tote', 'bag', 'canvas'],
    featured: false,
    mockupImage: '/store/nrpg-tote-bag.svg',
  },
  {
    id: 'nrpg-hoodie',
    slug: 'nrpg-hoodie',
    name: 'NRPG Hoodie',
    description:
      'Premium heavyweight hoodie with embroidered NRPG crest on left chest and printed logo across the back. Fleece-lined for warmth on site.',
    category: 'workwear',
    printfulProductId: 146,
    basePrice: 85,
    variants: withSku('HOODIE', sizesSmallToXXL),
    tags: ['hoodie', 'warm', 'fleece'],
    featured: true,
    mockupImage: '/store/nrpg-hoodie.svg',
  },
  {
    id: 'nrpg-casual-polo',
    slug: 'nrpg-casual-polo',
    name: 'NRPG Polo (Casual, Black)',
    description:
      'Relaxed-fit cotton pique polo in black with embroidered NRPG logo. Suitable for networking events, training days, and casual site visits.',
    category: 'workwear',
    printfulProductId: 380,
    basePrice: 58,
    variants: withSku('CASPOLO', sizesSmallToXXL),
    tags: ['polo', 'casual', 'black'],
    featured: false,
    mockupImage: '/store/nrpg-casual-polo.svg',
  },
  {
    id: 'nrpg-hard-hat',
    slug: 'nrpg-hard-hat',
    name: 'NRPG Hard Hat (Yellow)',
    description:
      'AS/NZS 1801 compliant Type 1 hard hat in yellow with printed NRPG logo. Ratchet-style headband for secure fit. Includes sweatband.',
    category: 'accessories',
    printfulProductId: undefined,
    basePrice: 42,
    variants: withSku('HARDHAT', [
      { id: 'standard', name: 'Standard', sku: '', priceAdjustment: 0, options: {}, inStock: true },
    ]),
    tags: ['hard-hat', 'safety', 'ppe'],
    featured: false,
    mockupImage: '/store/nrpg-hard-hat.svg',
  },
  {
    id: 'nrpg-welcome-bundle',
    slug: 'nrpg-welcome-bundle',
    name: 'NRPG Contractor Welcome Bundle',
    description:
      'Everything a new NRPG contractor needs: Hi-Vis Polo, Structured Cap, and Sticker Pack bundled together. Saves $11 compared to individual purchase.',
    category: 'bundles',
    printfulProductId: undefined,
    basePrice: 110,
    variants: withSku('BUNDLE', sizesSmallToXXL),
    tags: ['bundle', 'starter', 'value'],
    featured: true,
    mockupImage: '/store/nrpg-welcome-bundle.svg',
  },
]

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getProductById(id: string): StoreProduct | undefined {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug: string): StoreProduct | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: StoreProduct['category']): StoreProduct[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): StoreProduct[] {
  return products.filter((p) => p.featured)
}
