/**
 * Setup Stripe Products and Prices
 * Run this script to create subscription products in Stripe
 *
 * Usage:
 * npx ts-node scripts/setup-stripe-products.ts
 */

import { stripe } from '../lib/stripe';

const PRODUCTS = [
  {
    name: 'NRPG 25km Coverage',
    tier: 'RADIUS_25KM',
    price: 9900, // $99 in cents
    description: 'NRPG contractor subscription - 25km radius coverage',
  },
  {
    name: 'NRPG 50km Coverage',
    tier: 'RADIUS_50KM',
    price: 19900, // $199 in cents
    description: 'NRPG contractor subscription - 50km radius coverage',
  },
  {
    name: 'NRPG 100km Coverage',
    tier: 'RADIUS_100KM',
    price: 34900, // $349 in cents
    description: 'NRPG contractor subscription - 100km radius coverage',
  },
  {
    name: 'NRPG Rural Coverage',
    tier: 'RURAL',
    price: 49900, // $499 in cents
    description: 'NRPG contractor subscription - Rural coverage (200km+)',
  },
];

async function setupStripeProducts() {
  console.log('Setting up Stripe products and prices...\n');

  const envVariables: string[] = [];

  for (const product of PRODUCTS) {
    try {
      console.log(`Creating product: ${product.name}...`);

      // Create product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          tier: product.tier,
        },
      });

      console.log(`  Product created: ${stripeProduct.id}`);

      // Create price
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'aud',
        recurring: {
          interval: 'month',
        },
        metadata: {
          tier: product.tier,
        },
      });

      console.log(`  Price created: ${stripePrice.id}`);
      console.log(`  Amount: $${product.price / 100} AUD/month\n`);

      // Store env variable for later
      const envVar = `STRIPE_PRICE_${product.tier.replace('RADIUS_', '')}=${stripePrice.id}`;
      envVariables.push(envVar);
    } catch (error) {
      console.error(`Error creating product ${product.name}:`, error);
    }
  }

  console.log('\n✅ All products and prices created successfully!\n');
  console.log('Add these environment variables to your .env file:\n');
  console.log('# Stripe Price IDs');
  envVariables.forEach((envVar) => console.log(envVar));
  console.log('\n');
}

setupStripeProducts()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
