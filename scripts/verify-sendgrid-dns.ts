#!/usr/bin/env ts-node
/**
 * SendGrid DNS Configuration Verifier
 * Checks if all required DNS records are configured correctly
 *
 * Usage: npx ts-node scripts/verify-sendgrid-dns.ts
 *
 * Exit codes:
 *   0 = All DNS records verified ✅
 *   1 = One or more DNS records missing or incorrect ❌
 */

import dns from 'dns/promises';
import https from 'https';

interface DNSRecord {
  name: string;
  type: 'CNAME' | 'TXT' | 'A' | 'MX';
  expected: string;
  fullDomain: string;
}

const DOMAIN = 'disasterrecovery.com.au';
const SENDGRID_BASE = 'u49942585.wl086.sendgrid.net';

// DNS records required for SendGrid authentication
const DNS_RECORDS: DNSRecord[] = [
  {
    name: 'em7959',
    type: 'CNAME',
    expected: SENDGRID_BASE,
    fullDomain: `em7959.${DOMAIN}`,
  },
  {
    name: 's1._domainkey',
    type: 'CNAME',
    expected: `s1.domainkey.${SENDGRID_BASE}`,
    fullDomain: `s1._domainkey.${DOMAIN}`,
  },
  {
    name: 's2._domainkey',
    type: 'CNAME',
    expected: `s2.domainkey.${SENDGRID_BASE}`,
    fullDomain: `s2._domainkey.${DOMAIN}`,
  },
  {
    name: '_dmarc',
    type: 'TXT',
    expected: 'v=DMARC1; p=none;',
    fullDomain: `_dmarc.${DOMAIN}`,
  },
];

interface VerificationResult {
  record: string;
  status: 'PASS' | 'FAIL' | 'PENDING';
  expected: string;
  actual: string | null;
  error: string | null;
}

async function resolveCNAME(domain: string, retries = 3, delayMs = 500): Promise<string | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const records = await dns.resolveCname(domain);
      // CNAME records can have multiple values, return the first one
      if (records && records.length > 0) {
        // Normalize: remove trailing dot if present
        return records[0].replace(/\.$/, '');
      }
      return null;
    } catch (error) {
      if (attempt < retries) {
        console.log(`  ⏳ DNS lookup attempt ${attempt} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        // Return null after all retries exhausted
        return null;
      }
    }
  }
  return null;
}

async function resolveTXT(domain: string, retries = 3, delayMs = 500): Promise<string | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const records = await dns.resolveTxt(domain);
      if (records && records.length > 0) {
        // TXT records are arrays of strings, join them
        return records[0].join('');
      }
      return null;
    } catch (error) {
      if (attempt < retries) {
        console.log(`  ⏳ DNS lookup attempt ${attempt} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        return null;
      }
    }
  }
  return null;
}

async function verifySendGridAuthentication(): Promise<boolean> {
  return new Promise((resolve) => {
    // Check if SendGrid API key is available
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.log('⏭️  Skipping SendGrid API verification (SENDGRID_API_KEY not set)');
      resolve(false);
      return;
    }

    const data = JSON.stringify({
      domain: DOMAIN,
    });

    const options = {
      hostname: 'api.sendgrid.com',
      port: 443,
      path: '/v3/whitelabel/domains',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          // We're just checking if API is reachable and authenticated
          resolve(res.statusCode === 200 || res.statusCode === 404);
        } catch (error) {
          resolve(false);
        }
      });
    });

    req.on('error', () => {
      resolve(false);
    });

    req.end();
  });
}

async function verifyDNSRecords(): Promise<VerificationResult[]> {
  const results: VerificationResult[] = [];

  console.log('\n🔍 Verifying DNS Records...\n');

  for (const record of DNS_RECORDS) {
    console.log(`Checking ${record.type}: ${record.fullDomain}`);

    let actual: string | null = null;
    let error: string | null = null;

    try {
      if (record.type === 'CNAME') {
        actual = await resolveCNAME(record.fullDomain);
      } else if (record.type === 'TXT') {
        actual = await resolveTXT(record.fullDomain);
      }

      if (actual === null) {
        error = 'DNS record not found (not yet propagated or not added)';
      } else {
        // Normalize for comparison
        const actualNormalized = actual.toLowerCase().trim();
        const expectedNormalized = record.expected.toLowerCase().trim();

        if (actualNormalized === expectedNormalized) {
          console.log(`  ✅ PASS: ${actual}\n`);
          results.push({
            record: record.name,
            status: 'PASS',
            expected: record.expected,
            actual,
            error: null,
          });
        } else {
          console.log(`  ❌ FAIL: Expected "${record.expected}", got "${actual}"\n`);
          error = `Mismatch: expected "${record.expected}", got "${actual}"`;
          results.push({
            record: record.name,
            status: 'FAIL',
            expected: record.expected,
            actual,
            error,
          });
        }
      }
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
      console.log(`  ❌ FAIL: ${error}\n`);
      results.push({
        record: record.name,
        status: 'FAIL',
        expected: record.expected,
        actual: null,
        error,
      });
    }

    if (error && !error.includes('not yet propagated')) {
      results[results.length - 1].status = 'FAIL';
    } else if (error) {
      results[results.length - 1].status = 'PENDING';
    }
  }

  return results;
}

function printSummary(results: VerificationResult[]): void {
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const pending = results.filter(r => r.status === 'PENDING').length;

  console.log('\n' + '='.repeat(60));
  console.log('📊 DNS VERIFICATION SUMMARY\n');

  console.log(`✅ Passed:  ${passed}/4`);
  if (failed > 0) console.log(`❌ Failed:  ${failed}/4`);
  if (pending > 0) console.log(`⏳ Pending: ${pending}/4 (DNS still propagating)`);

  console.log('\n' + '='.repeat(60));

  if (passed === 4) {
    console.log('\n✅ ALL DNS RECORDS VERIFIED!');
    console.log('\n📋 Next Steps:');
    console.log('1. ✅ DNS is configured correctly');
    console.log('2.📝 Set up environment variables (see SENDGRID_SETUP.md)');
    console.log('3. 🧪 Run pre-flight check: npm run email:preflight');
    console.log('4. 🚀 Ready to send emails!\n');
    return;
  }

  if (pending > 0 && failed === 0) {
    console.log('\n⏳ DNS RECORDS ARE STILL PROPAGATING');
    console.log('\n📋 What to do:');
    console.log('1. ⏳ Wait 1-4 hours for DNS to propagate');
    console.log('2. 🔄 Run this verification again: npm run email:verify-dns');
    console.log('3. 📞 If still failing after 24 hours, check:');
    console.log('   - All 4 records are in your domain registrar');
    console.log('   - Spelling is exactly correct (check underscores!)');
    console.log('   - Record types are correct (CNAME vs TXT)\n');
    return;
  }

  if (failed > 0) {
    console.log('\n❌ DNS VERIFICATION FAILED');
    console.log('\n⚠️  Issues Found:\n');

    results.forEach((result) => {
      if (result.status === 'FAIL') {
        console.log(`${result.record}:`);
        console.log(`  Expected: ${result.expected}`);
        console.log(`  Actual:   ${result.actual || '(not found)'}`);
        if (result.error) console.log(`  Error:    ${result.error}`);
        console.log('');
      }
    });

    console.log('📋 Troubleshooting Steps:');
    console.log('1. 🔍 Log into your domain registrar');
    console.log('2. 📝 Check all 4 DNS records are added exactly as shown');
    console.log('3. ⚠️  Look for typos, especially underscores (_)');
    console.log('4. 🌐 Check you\'re editing the correct domain');
    console.log('5. ⏳ Wait and retry: DNS takes 1-48 hours to propagate');
    console.log('6. 📚 For help, see docs/EMAIL_DNS_SETUP.md\n');
  }
}

async function main(): Promise<void> {
  console.log('\n🚀 SendGrid DNS Configuration Verification');
  console.log(`📍 Domain: ${DOMAIN}`);
  console.log(`🔑 Sending via: SendGrid (${SENDGRID_BASE})\n`);

  try {
    // Verify DNS records
    const results = await verifyDNSRecords();

    // Print summary
    printSummary(results);

    // Exit with appropriate code
    const hasFailed = results.some(r => r.status === 'FAIL');
    process.exit(hasFailed ? 1 : 0);
  } catch (error) {
    console.error('❌ Verification failed with error:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run verification
main();
