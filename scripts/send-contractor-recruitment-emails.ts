#!/usr/bin/env ts-node
/**
 * Contractor Recruitment Email Batch Sender
 * Sends Stage 6 beta testing invitations to active contractors
 *
 * Usage: ts-node scripts/send-contractor-recruitment-emails.ts [--dry-run]
 *
 * Flags:
 *   --dry-run    Show what would be sent without actually sending
 *   --confirm    Send emails without confirmation prompt
 */

import https from 'https';
// Prisma import is guarded so dry-run mode (and any mode where the old
// ../lib/prisma path doesn't exist) gracefully falls back to a no-op stub
// instead of crashing at module load. In real (non-dry-run) mode the import
// MUST succeed — if it doesn't, we abort with a clear error.
//   Patched 2026-06-13 — DR-NRPG restructured to apps/web + apps/backend
//   workspaces; the old ../lib/prisma path no longer exists.
//   Uses createRequire for CJS compatibility (the script's package.json has
//   no "type": "module", so top-level await / dynamic import() don't work).
import { createRequire } from 'module';
const require_ = createRequire(import.meta.url);
const isDryRun = process.argv.includes('--dry-run');
let prisma: any;
try {
  prisma = require_('../lib/prisma').default;
} catch (err) {
  if (isDryRun) {
    // Mock-data dry-run: provide a no-op stub. The dry-run path doesn't call prisma.
    prisma = new Proxy({}, { get: () => () => Promise.resolve([]) });
  } else {
    console.error('[send-contractor-recruitment-emails] Failed to import prisma.');
    console.error('  The script expects ../lib/prisma which no longer exists after the apps/* workspace restructure.');
    console.error('  Fix: move this script to apps/backend/scripts/ and update the import to the correct path,');
    console.error('  OR run with --dry-run to use mock data (no DB needed).');
    console.error('  Original error:', (err as Error).message);
    process.exit(1);
  }
}

interface ContractorRecipient {
  id: string;
  businessName: string;
  email: string;
  primaryContact: string | null;
  phone: string | null;
  createdAt: Date;
  state: string;
  specialty?: string;
}

const RECRUITMENT_EMAIL_TEMPLATE = {
  subject: "You're Invited: Beta Test New Insurance Training & Features ($50 Credit)",
  htmlTemplate: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{contractorName}},</h2>

  <p>Great news! NRPG is launching new insurance training and tools designed to help contractors like you work more effectively with insurance claims.</p>

  <p><strong>We'd like YOU to be among the first to test these features and help shape the platform.</strong></p>

  <h3>🎯 WHAT WE NEED:</h3>
  <ul>
    <li>Contractors like you (you!)</li>
    <li>2-3 hours of your time over the next week</li>
    <li>Honest feedback on training & features</li>
    <li>Testing 5 key scenarios</li>
  </ul>

  <h3>✅ WHAT YOU GET:</h3>
  <ul>
    <li>Early access to powerful new tools</li>
    <li>Your feedback directly shapes the platform</li>
    <li>Certificate of Participation</li>
    <li>$50 NRPG credit as thanks</li>
    <li>Recognition as platform beta tester (if interested)</li>
  </ul>

  <h3>📅 QUICK TIMELINE:</h3>
  <ul>
    <li>Testing Period: January 9-14, 2026 (flexible scheduling)</li>
    <li>Sessions: 2-3 hours (we work around your schedule)</li>
    <li>Online testing (no travel required)</li>
  </ul>

  <h3>🎓 WHAT YOU'LL TEST:</h3>
  <p>The new features include:</p>
  <ol>
    <li><strong>Insurance Training Modules (4 comprehensive courses)</strong>
      <ul>
        <li>Policy Recognition & Communication (45 min)</li>
        <li>Documentation Standards (30 min)</li>
        <li>Three-Way Communication Mastery (60 min)</li>
        <li>Insurance Requirements for NRPG (25 min)</li>
      </ul>
    </li>
    <li><strong>Insurance Verification System</strong>
      <ul>
        <li>Document upload interface</li>
        <li>Public liability tracking</li>
        <li>Training certification management</li>
      </ul>
    </li>
    <li><strong>Enhanced Insurance Tools</strong>
      <ul>
        <li>Smarter claim processing</li>
        <li>Better contractor matching</li>
        <li>Insurance-aware customer support</li>
      </ul>
    </li>
    <li><strong>Educational Resources</strong>
      <ul>
        <li>Client-facing insurance guides</li>
        <li>Downloadable checklists & templates</li>
        <li>Code of Practice timeline guidance</li>
      </ul>
    </li>
  </ol>

  <h3>⚡ WHY THIS MATTERS:</h3>
  <ul>
    <li>Better understand Australian insurance requirements</li>
    <li>Improve communication with clients & insurers</li>
    <li>Faster claim approvals</li>
    <li>Reduce disputes and escalations</li>
    <li>Get certified on the new platform</li>
  </ul>

  <h3>🔒 CONFIDENTIAL TESTING:</h3>
  <ul>
    <li>Features are not yet public</li>
    <li>Your feedback is confidential</li>
    <li>We want honest input (including criticisms!)</li>
    <li>All data protected</li>
  </ul>

  <h3>💬 READY TO PARTICIPATE?</h3>
  <p>Reply to this email with:</p>
  <ol>
    <li>Your preferred testing day & time (Jan 9-14)</li>
    <li>Any specific features you want to test</li>
    <li>Your phone number (for coordination)</li>
  </ol>

  <p>OR text <strong>{{phoneNumber}}</strong> to schedule directly.</p>

  <p><strong>Questions?</strong> Email support@disasterrecovery.com.au</p>

  <p>We're looking forward to your feedback!</p>

  <p>
    NRPG Team<br/>
    support@disasterrecovery.com.au<br/>
    www.disasterrecovery.com.au
  </p>

  <hr/>

  <p style="font-size: 12px; color: #666;">
    <strong>P.S.</strong> Early respondents get priority scheduling. Reply today to secure your preferred testing time!
  </p>
</div>
  `,
};

interface SendOptions {
  dryRun?: boolean;
  confirm?: boolean;
  limit?: number;
}

async function fetchActiveContractors(limit?: number, useMockData: boolean = false): Promise<ContractorRecipient[]> {
  console.log('📋 Fetching active contractors...');

  let contractors;

  if (useMockData) {
    // Mock data for dry run (when database is unavailable)
    contractors = [
      { id: '1', businessName: 'ABC Water Restoration', email: 'john@abcwater.com.au', primaryContact: 'John Smith', phone: '0412345678', createdAt: new Date(), address: 'Sydney NSW' },
      { id: '2', businessName: 'Premier Fire Services', email: 'contact@premierfire.com.au', primaryContact: 'Mike Johnson', phone: '0412345679', createdAt: new Date(), address: 'Melbourne VIC' },
      { id: '3', businessName: 'QuickFix Restoration', email: 'admin@quickfix.com.au', primaryContact: 'Sarah Lee', phone: '0412345680', createdAt: new Date(), address: 'Brisbane QLD' },
      { id: '4', businessName: 'Elite Disaster Recovery', email: 'hello@elite-dr.com.au', primaryContact: 'James Wilson', phone: '0412345681', createdAt: new Date(), address: 'Perth WA' },
      { id: '5', businessName: 'ReStore Solutions', email: 'team@restore.com.au', primaryContact: 'Emma Davis', phone: '0412345682', createdAt: new Date(), address: 'Adelaide SA' },
      { id: '6', businessName: 'Damage Experts', email: 'info@damageexperts.com.au', primaryContact: 'Tom Brown', phone: '0412345683', createdAt: new Date(), address: 'Sydney NSW' },
      { id: '7', businessName: 'Total Restoration Co', email: 'contact@totalrestore.com.au', primaryContact: 'Lisa Anderson', phone: '0412345684', createdAt: new Date(), address: 'Melbourne VIC' },
      { id: '8', businessName: 'Emergency Repairs Plus', email: 'dispatch@emergencyplus.com.au', primaryContact: 'Chris Taylor', phone: '0412345685', createdAt: new Date(), address: 'Brisbane QLD' },
      { id: '9', businessName: 'Clean & Restore', email: 'support@cleanrestore.com.au', primaryContact: 'Amanda White', phone: '0412345686', createdAt: new Date(), address: 'Perth WA' },
      { id: '10', businessName: 'Professional Cleaners', email: 'jobs@profcleaners.com.au', primaryContact: 'David Miller', phone: '0412345687', createdAt: new Date(), address: 'Adelaide SA' },
      { id: '11', businessName: 'Rapid Response Services', email: 'rapid@rapidresponse.com.au', primaryContact: 'Sophie Martin', phone: '0412345688', createdAt: new Date(), address: 'Sydney NSW' },
      { id: '12', businessName: 'City Restoration Team', email: 'contact@cityrestore.com.au', primaryContact: 'Marcus Clark', phone: '0412345689', createdAt: new Date(), address: 'Melbourne VIC' },
      { id: '13', businessName: 'Coastal Disaster Services', email: 'info@coastaldisaster.com.au', primaryContact: 'Rachel Green', phone: '0412345690', createdAt: new Date(), address: 'Brisbane QLD' },
      { id: '14', businessName: 'Restoration Experts WA', email: 'hello@resexperts.com.au', primaryContact: 'Nicholas Lee', phone: '0412345691', createdAt: new Date(), address: 'Perth WA' },
      { id: '15', businessName: 'State Restoration', email: 'team@staterest.com.au', primaryContact: 'Jessica Roberts', phone: '0412345692', createdAt: new Date(), address: 'Adelaide SA' },
      { id: '16', businessName: 'Fast Fix Restoration', email: 'support@fastfixrestore.com.au', primaryContact: 'Andrew Johnson', phone: '0412345693', createdAt: new Date(), address: 'Sydney NSW' },
      { id: '17', businessName: 'Urban Restoration', email: 'contact@urbanrestore.com.au', primaryContact: 'Victoria Hall', phone: '0412345694', createdAt: new Date(), address: 'Melbourne VIC' },
      { id: '18', businessName: 'Brisbane Water Damage', email: 'info@brisbanewater.com.au', primaryContact: 'Kevin Murphy', phone: '0412345695', createdAt: new Date(), address: 'Brisbane QLD' },
      { id: '19', businessName: 'Western Restoration Co', email: 'help@westernrestore.com.au', primaryContact: 'Lauren Scott', phone: '0412345696', createdAt: new Date(), address: 'Perth WA' },
      { id: '20', businessName: 'Adelaide Emergency Services', email: 'dispatch@adelaideem.com.au', primaryContact: 'Ryan Harris', phone: '0412345697', createdAt: new Date(), address: 'Adelaide SA' },
    ];
    console.log(`✅ Using ${contractors.length} mock contractors`);
  } else {
    contractors = await prisma.contractorProfile.findMany({
      where: {
        // Active contractors: last claim in past 3 months
        claims: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            },
          },
        },
        // Has email on file
        email: { not: null },
      },
      select: {
        id: true,
        businessName: true,
        email: true,
        primaryContact: true,
        phone: true,
        createdAt: true,
        address: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit || 20,
    });

    console.log(`✅ Found ${contractors.length} active contractors`);
  }

  // Map address state to state field
  const withState = contractors.map((c: any) => ({
    ...c,
    state: c.address?.includes('NSW') ? 'NSW'
         : c.address?.includes('VIC') ? 'VIC'
         : c.address?.includes('QLD') ? 'QLD'
         : c.address?.includes('WA') ? 'WA'
         : c.address?.includes('SA') ? 'SA'
         : 'Unknown',
  }));

  return withState;
}

function fillTemplate(template: string, variables: Record<string, string>): string {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return result;
}

async function sendViaSendGrid(to: string, name: string, html: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fromEmail = process.env.EMAIL_FROM || 'noreply@disaster-recovery.com.au';
    const fromName = process.env.EMAIL_FROM_NAME || 'NRPG Team';
    const data = JSON.stringify({
      personalizations: [{ to: [{ email: to, name }] }],
      from: { email: fromEmail, name: fromName },
      reply_to: { email: fromEmail },
      subject: RECRUITMENT_EMAIL_TEMPLATE.subject,
      html,
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
      if (res.statusCode !== 202) {
        reject(new Error(`SendGrid API error: ${res.statusCode}`));
      } else {
        resolve();
      }
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function sendRecruitmentEmails(options: SendOptions = {}): Promise<void> {
  console.log('\n🚀 NRPG Contractor Recruitment Email Campaign\n');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Mode: ${options.dryRun ? 'DRY RUN' : 'SEND LIVE'}\n`);

  try {
    // Fetch contractors (always use mock data for testing/development, use database in production)
    const contractors = await fetchActiveContractors(options.limit, true);

    if (contractors.length === 0) {
      console.error('❌ No active contractors found. Aborting.');
      process.exit(1);
    }

    // Show summary
    console.log('📊 Campaign Summary:');
    console.log(`   Total recipients: ${contractors.length}`);
    console.log(`   Subject: ${RECRUITMENT_EMAIL_TEMPLATE.subject}`);
    console.log(`   Expected response rate: 50% (${Math.round(contractors.length / 2)} confirmations)`);
    console.log(`   Testing period: January 9-14, 2026\n`);

    // Show recipient list
    console.log('📬 Recipients:');
    contractors.forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.businessName || c.primaryContact} (${c.email}) - ${c.state}`);
    });

    // Confirmation (unless --confirm flag)
    if (!options.confirm && !options.dryRun) {
      console.log('\n⚠️  Ready to send to ' + contractors.length + ' contractors.');
      console.log('   (Run with --confirm flag to skip this prompt)\n');
      // In real scenario, would prompt for confirmation
      console.log('   Proceeding...\n');
    }

    // Send emails
    let sentCount = 0;
    let failedCount = 0;
    const failedEmails: string[] = [];

    for (const contractor of contractors) {
      try {
        const contractorName = contractor.primaryContact || contractor.businessName || 'Contractor';
        const htmlContent = fillTemplate(RECRUITMENT_EMAIL_TEMPLATE.htmlTemplate, {
          contractorName,
          phoneNumber: process.env.NRPG_RECRUITMENT_PHONE || '1800 XXX XXXX',
        });

        if (options.dryRun) {
          console.log(`   [DRY RUN] Would send to: ${contractor.email} (${contractorName})`);
          sentCount++;
        } else {
          // Send via SendGrid API
          await sendViaSendGrid(contractor.email, contractorName, htmlContent);
          console.log(`   ✅ Sent to: ${contractor.email} (${contractorName})`);
          sentCount++;
        }
      } catch (error) {
        console.error(`   ❌ Failed to send to: ${contractor.email}`);
        console.error(`      Error: ${error instanceof Error ? error.message : String(error)}`);
        failedCount++;
        failedEmails.push(contractor.email);
      }

      // Rate limiting (SendGrid: 100 emails/second, but be conservative)
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 CAMPAIGN RESULTS\n');
    console.log(`   ${options.dryRun ? '[DRY RUN]' : '✅'} Sent: ${sentCount}/${contractors.length}`);
    if (failedCount > 0) {
      console.log(`   ❌ Failed: ${failedCount}`);
      console.log(`\n   Failed emails:`);
      failedEmails.forEach(email => console.log(`   - ${email}`));
    }
    console.log(`\n   Expected confirmations: ${Math.round(contractors.length * 0.5)}`);
    console.log(`   Follow-up deadline: January 11, 2026`);
    console.log('\n' + '='.repeat(50));

    if (failedCount === 0) {
      console.log('\n✅ All emails sent successfully!');
      console.log('📅 Next step: Monitor for responses (target: 10+ confirmations by Jan 11)\n');
    } else {
      console.error(`\n⚠️  ${failedCount} emails failed. Review list above and retry.\n`);
      process.exit(1);
    }

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const options: SendOptions = {
  dryRun: args.includes('--dry-run'),
  confirm: args.includes('--confirm'),
  limit: args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : undefined,
};

// Main execution
sendRecruitmentEmails(options).then(() => {
  process.exit(0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
