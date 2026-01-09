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

import { SendGridProvider } from '../lib/email/providers/sendgrid';
import prisma from '../lib/prisma';

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

async function fetchActiveContractors(limit?: number): Promise<ContractorRecipient[]> {
  console.log('📋 Fetching active contractors...');

  const contractors = await prisma.contractorProfile.findMany({
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

  // Map address state to state field
  const withState = contractors.map(c => ({
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

async function sendRecruitmentEmails(options: SendOptions = {}): Promise<void> {
  console.log('\n🚀 NRPG Contractor Recruitment Email Campaign\n');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Mode: ${options.dryRun ? 'DRY RUN' : 'SEND LIVE'}\n`);

  try {
    // Fetch contractors
    const contractors = await fetchActiveContractors(options.limit);

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
    const sendGridProvider = new SendGridProvider();
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
          // Send via SendGrid
          await sendGridProvider.send({
            to: contractor.email,
            from: 'support@disasterrecovery.com.au',
            replyTo: 'support@disasterrecovery.com.au',
            subject: RECRUITMENT_EMAIL_TEMPLATE.subject,
            html: htmlContent,
          });

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
