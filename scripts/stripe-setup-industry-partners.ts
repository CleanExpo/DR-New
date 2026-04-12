/**
 * Stripe Setup — Industry Partner Products & Prices
 *
 * Run this script ONCE to create the Stripe Products and Prices for
 * Industry Partner tiers. It prints the resulting Price IDs to add
 * to your .env.local.
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/stripe-setup-industry-partners.ts
 *
 * Prerequisites:
 *   STRIPE_SECRET_KEY must be set (use test key for staging, live key for prod)
 */

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
})

interface PriceConfig {
  billing: 'monthly' | 'annual'
  amount: number    // in cents (AUD)
  currency: string
  interval: 'month' | 'year'
}

interface ProductConfig {
  tier: 'standard' | 'premium'
  name: string
  description: string
  prices: PriceConfig[]
}

const PRODUCTS: ProductConfig[] = [
  {
    tier: 'standard',
    name: 'NRPG Industry Partner — Standard',
    description: 'Enhanced directory listing, job referrals, logo display, and premium templates.',
    prices: [
      { billing: 'monthly', amount: 4900,  currency: 'aud', interval: 'month' },
      { billing: 'annual',  amount: 49000, currency: 'aud', interval: 'year'  },
    ],
  },
  {
    tier: 'premium',
    name: 'NRPG Industry Partner — Premium',
    description: 'Featured placement, verified badge, priority referrals, benchmark reports.',
    prices: [
      { billing: 'monthly', amount: 14900,  currency: 'aud', interval: 'month' },
      { billing: 'annual',  amount: 149000, currency: 'aud', interval: 'year'  },
    ],
  },
]

async function run() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set. Aborting.')
    process.exit(1)
  }

  console.log('Creating Stripe Products and Prices for Industry Partners...\n')

  const envLines: string[] = []

  for (const product of PRODUCTS) {
    console.log(`Creating product: ${product.name}`)

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: {
        tier: product.tier,
        platform: 'nrpg_industry_partners',
      },
    })

    console.log(`  Product created: ${stripeProduct.id}`)

    for (const price of product.prices) {
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: price.amount,
        currency: price.currency,
        recurring: { interval: price.interval },
        nickname: `${product.tier} ${price.billing}`,
        metadata: {
          tier: product.tier,
          billing: price.billing,
        },
      })

      const envKey = `STRIPE_IP_${product.tier.toUpperCase()}_${price.billing.toUpperCase()}_PRICE_ID`
      console.log(`  Price created (${price.billing}): ${stripePrice.id}`)
      envLines.push(`${envKey}=${stripePrice.id}`)
    }

    console.log()
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Add these to your .env.local:\n')
  envLines.forEach(line => console.log(line))
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('\nDone. Set up the webhook in Stripe Dashboard:')
  console.log('  URL: https://disasterrecovery.com.au/api/industry-partners/webhook')
  console.log('  Events: checkout.session.completed, customer.subscription.*,')
  console.log('          invoice.payment_failed, invoice.payment_succeeded')
  console.log('\nThen add: STRIPE_IP_WEBHOOK_SECRET=whsec_xxx to .env.local')
}

run().catch(err => {
  console.error('Script failed:', err)
  process.exit(1)
})
