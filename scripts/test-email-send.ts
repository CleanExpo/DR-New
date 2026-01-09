#!/usr/bin/env ts-node
/**
 * Test Email Send Script
 * Sends a single test email to verify SendGrid configuration
 *
 * Usage: npx ts-node scripts/test-email-send.ts recipient@example.com
 *
 * Example: npx ts-node scripts/test-email-send.ts john@example.com
 *
 * Exit codes:
 *   0 = Email sent successfully ✅
 *   1 = Email send failed ❌
 */

import https from 'https';

interface TestEmailConfig {
  recipientEmail: string;
  recipientName: string;
}

const TEST_EMAIL_TEMPLATE = {
  subject: "Test Email - NRPG Platform Configuration Verification",
  htmlTemplate: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Test Email from NRPG</h2>

  <p>Hi {{recipientName}},</p>

  <p>This is a <strong>test email</strong> from the NRPG (National Restoration Partner Gateway) platform.</p>

  <h3>✅ If you received this email:</h3>
  <ul>
    <li>SendGrid configuration is working correctly</li>
    <li>DNS records are properly configured</li>
    <li>The email sending system is ready for production use</li>
  </ul>

  <h3>📧 Email Details:</h3>
  <p>
    <strong>From:</strong> {{fromEmail}}<br/>
    <strong>To:</strong> {{recipientEmail}}<br/>
    <strong>Sent:</strong> {{sentAt}}<br/>
    <strong>Environment:</strong> {{environment}}
  </p>

  <h3>🎯 Next Steps:</h3>
  <p>You can now proceed with the contractor recruitment email campaign:</p>
  <ol>
    <li>Run the dry run: <code>npm run email:dry-run</code></li>
    <li>Review the recipient list</li>
    <li>Send to limited batch (2-3 test contractors): <code>npm run email:send -- --limit 3</code></li>
    <li>Monitor delivery</li>
    <li>Send to full batch (20 contractors): <code>npm run email:send -- --confirm</code></li>
  </ol>

  <h3>❓ If you didn't receive this email:</h3>
  <p>
    Check the following:
  </p>
  <ul>
    <li>Check spam/junk folder</li>
    <li>Verify SENDGRID_API_KEY is set correctly</li>
    <li>Run DNS verification: <code>npm run email:verify-dns</code></li>
    <li>Wait for DNS propagation (up to 48 hours)</li>
    <li>Check SendGrid dashboard for any account issues</li>
  </ul>

  <hr/>

  <p style="font-size: 12px; color: #666;">
    This is an automated test email. No action is required.
  </p>

  <p style="font-size: 12px;">
    NRPG Team<br/>
    support@disasterrecovery.com.au<br/>
    www.disasterrecovery.com.au
  </p>
</div>
  `,
};

function fillTemplate(template: string, variables: Record<string, string>): string {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return result;
}

async function sendTestEmail(config: TestEmailConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const fromEmail = process.env.EMAIL_FROM || 'noreply@disaster-recovery.com.au';
    const fromName = process.env.EMAIL_FROM_NAME || 'NRPG Team';

    const htmlContent = fillTemplate(TEST_EMAIL_TEMPLATE.htmlTemplate, {
      recipientName: config.recipientName,
      fromEmail,
      recipientEmail: config.recipientEmail,
      sentAt: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });

    const data = JSON.stringify({
      personalizations: [
        {
          to: [{ email: config.recipientEmail, name: config.recipientName }],
        },
      ],
      from: { email: fromEmail, name: fromName },
      reply_to: { email: fromEmail },
      subject: TEST_EMAIL_TEMPLATE.subject,
      html: htmlContent,
    });

    const options = {
      hostname: 'api.sendgrid.com',
      port: 443,
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 202) {
          resolve();
        } else {
          reject(
            new Error(
              `SendGrid API error: ${res.statusCode} - ${body}`
            )
          );
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main(): Promise<void> {
  // Parse CLI arguments
  const recipientEmail = process.argv[2];
  const recipientName = process.argv[3] || 'Tester';

  console.log('\n🚀 NRPG Test Email Sender\n');

  // Validate input
  if (!recipientEmail) {
    console.error('❌ Error: No email address provided');
    console.error('\nUsage: npx ts-node scripts/test-email-send.ts <email> [name]');
    console.error('Example: npx ts-node scripts/test-email-send.ts john@example.com John');
    process.exit(1);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(recipientEmail)) {
    console.error(`❌ Error: Invalid email address: "${recipientEmail}"`);
    console.error('Please provide a valid email address (e.g., john@example.com)');
    process.exit(1);
  }

  // Check for API key
  if (!process.env.SENDGRID_API_KEY) {
    console.error('❌ Error: SENDGRID_API_KEY not set');
    console.error('\nPlease set SENDGRID_API_KEY in your environment:');
    console.error('1. Add to .env.local: SENDGRID_API_KEY=SG.xxxxx');
    console.error('2. Or export in terminal: export SENDGRID_API_KEY=SG.xxxxx');
    process.exit(1);
  }

  console.log('📋 Test Email Configuration:\n');
  console.log(`  From:       ${process.env.EMAIL_FROM || 'noreply@disaster-recovery.com.au'}`);
  console.log(`  To:         ${recipientEmail} (${recipientName})`);
  console.log(`  Subject:    ${TEST_EMAIL_TEMPLATE.subject}`);
  console.log(`  Status:     Sending...\n`);

  try {
    await sendTestEmail({
      recipientEmail,
      recipientName,
    });

    console.log('✅ TEST EMAIL SENT SUCCESSFULLY!\n');
    console.log('📧 Email Details:');
    console.log(`  Recipient:  ${recipientEmail}`);
    console.log(`  Status Code: 202 (Accepted)\n`);

    console.log('📋 Next Steps:\n');
    console.log('1. ✅ Check your inbox (including spam folder)');
    console.log('2. ✅ If received: SendGrid is working correctly');
    console.log('3. 📝 Run dry run: npm run email:dry-run');
    console.log('4. 🚀 Send to limited batch: npm run email:send -- --limit 3');
    console.log('5. 📧 Send to all 20 contractors: npm run email:send -- --confirm\n');

    process.exit(0);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error('❌ TEST EMAIL FAILED\n');
    console.error('Error Details:');
    console.error(`  ${errorMessage}\n`);

    // Provide actionable troubleshooting
    if (errorMessage.includes('401')) {
      console.error('🔍 Troubleshooting: 401 Unauthorized');
      console.error('  • API key is invalid or expired');
      console.error('  • Solution 1: Verify SENDGRID_API_KEY is correct');
      console.error('  • Solution 2: Check SendGrid account is active (may need paid plan)');
      console.error('  • Solution 3: Generate a new API key from https://app.sendgrid.com/\n');
    } else if (errorMessage.includes('Domain')) {
      console.error('🔍 Troubleshooting: Domain Issue');
      console.error('  • Domain is not authenticated in SendGrid');
      console.error('  • Solution: Run npm run email:verify-dns');
      console.error('  • If DNS shows PENDING: Wait 1-4 hours for propagation\n');
    } else if (errorMessage.includes('Network')) {
      console.error('🔍 Troubleshooting: Network Error');
      console.error('  • Cannot reach SendGrid API');
      console.error('  • Solution: Check your internet connection');
      console.error('  • Check if SendGrid is accessible: https://status.sendgrid.com/\n');
    }

    console.error('📚 For more help:');
    console.error('  • See docs/SENDGRID_SETUP.md for configuration guide');
    console.error('  • See docs/EMAIL_TESTING_GUIDE.md for testing procedures');
    console.error('  • SendGrid Docs: https://docs.sendgrid.com/\n');

    process.exit(1);
  }
}

main();
