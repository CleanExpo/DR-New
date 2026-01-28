/**
 * Stripe Configuration Verification Script
 * Run with: npx tsx scripts/verify-stripe-config.ts
 */

import Stripe from 'stripe';

interface ConfigCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

async function verifyStripeConfig(): Promise<void> {
  const checks: ConfigCheck[] = [];

  console.log('\n=== Stripe Configuration Verification ===\n');

  // Check 1: Secret Key
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    checks.push({
      name: 'STRIPE_SECRET_KEY',
      status: 'fail',
      message: 'Missing from environment variables'
    });
  } else if (!secretKey.startsWith('sk_test_')) {
    checks.push({
      name: 'STRIPE_SECRET_KEY',
      status: 'warning',
      message: 'Not a test key (should start with sk_test_)'
    });
  } else {
    checks.push({
      name: 'STRIPE_SECRET_KEY',
      status: 'pass',
      message: 'Valid test key format'
    });
  }

  // Check 2: Publishable Key
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    checks.push({
      name: 'STRIPE_PUBLISHABLE_KEY',
      status: 'fail',
      message: 'Missing from environment variables'
    });
  } else if (!publishableKey.startsWith('pk_test_')) {
    checks.push({
      name: 'STRIPE_PUBLISHABLE_KEY',
      status: 'warning',
      message: 'Not a test key (should start with pk_test_)'
    });
  } else {
    checks.push({
      name: 'STRIPE_PUBLISHABLE_KEY',
      status: 'pass',
      message: 'Valid test key format'
    });
  }

  // Check 3-5: Price IDs
  const priceIds = {
    BASIC: process.env.STRIPE_TENANT_BASIC_PRICE_ID,
    PRO: process.env.STRIPE_TENANT_PRO_PRICE_ID,
    ENTERPRISE: process.env.STRIPE_TENANT_ENTERPRISE_PRICE_ID
  };

  for (const [tier, priceId] of Object.entries(priceIds)) {
    if (!priceId) {
      checks.push({
        name: `STRIPE_TENANT_${tier}_PRICE_ID`,
        status: 'fail',
        message: 'Missing from environment variables'
      });
    } else if (!priceId.startsWith('price_')) {
      checks.push({
        name: `STRIPE_TENANT_${tier}_PRICE_ID`,
        status: 'warning',
        message: 'Does not start with price_ (may be invalid)'
      });
    } else {
      checks.push({
        name: `STRIPE_TENANT_${tier}_PRICE_ID`,
        status: 'pass',
        message: 'Valid price ID format'
      });
    }
  }

  // Check 6: Webhook Secrets (optional)
  const webhookSecrets = [
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PAYMENTS_WEBHOOK_SECRET',
    'STRIPE_TENANT_WEBHOOK_SECRET'
  ];

  for (const secretName of webhookSecrets) {
    const secret = process.env[secretName];
    if (!secret) {
      checks.push({
        name: secretName,
        status: 'warning',
        message: 'Not configured (optional for testing)'
      });
    } else if (!secret.startsWith('whsec_')) {
      checks.push({
        name: secretName,
        status: 'warning',
        message: 'Does not start with whsec_ (may be invalid)'
      });
    } else {
      checks.push({
        name: secretName,
        status: 'pass',
        message: 'Valid webhook secret format'
      });
    }
  }

  // Test Stripe API Connection
  if (secretKey && secretKey.startsWith('sk_test_')) {
    try {
      const stripe = new Stripe(secretKey, {
        apiVersion: '2024-12-18.acacia'
      });

      // Test API connection
      await stripe.balance.retrieve();

      checks.push({
        name: 'Stripe API Connection',
        status: 'pass',
        message: 'Successfully connected to Stripe API'
      });

      // Verify price IDs exist
      for (const [tier, priceId] of Object.entries(priceIds)) {
        if (priceId && priceId.startsWith('price_')) {
          try {
            const price = await stripe.prices.retrieve(priceId);
            checks.push({
              name: `${tier} Price Verification`,
              status: 'pass',
              message: `${price.product} - ${(price.unit_amount! / 100).toFixed(2)} ${price.currency.toUpperCase()}/${price.recurring?.interval}`
            });
          } catch (error) {
            checks.push({
              name: `${tier} Price Verification`,
              status: 'fail',
              message: `Price ID not found in Stripe account`
            });
          }
        }
      }

    } catch (error: any) {
      checks.push({
        name: 'Stripe API Connection',
        status: 'fail',
        message: `Failed to connect: ${error.message}`
      });
    }
  }

  // Print Results
  console.log('Configuration Checks:\n');

  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;

  for (const check of checks) {
    const icon =
      check.status === 'pass' ? '✅' :
      check.status === 'fail' ? '❌' :
      '⚠️';

    console.log(`${icon} ${check.name}`);
    console.log(`   ${check.message}\n`);

    if (check.status === 'pass') passCount++;
    if (check.status === 'fail') failCount++;
    if (check.status === 'warning') warnCount++;
  }

  console.log('=== Summary ===\n');
  console.log(`✅ Passed: ${passCount}`);
  console.log(`⚠️  Warnings: ${warnCount}`);
  console.log(`❌ Failed: ${failCount}\n`);

  if (failCount > 0) {
    console.log('❌ Configuration incomplete. Please check failed items above.\n');
    process.exit(1);
  } else if (warnCount > 0) {
    console.log('⚠️  Configuration complete with warnings. Tests can run but some features may be limited.\n');
  } else {
    console.log('✅ All checks passed! Stripe is fully configured and ready to use.\n');
  }
}

verifyStripeConfig().catch((error) => {
  console.error('Error during verification:', error);
  process.exit(1);
});
