/**
 * Contractor Application API
 *
 * POST /api/landing/contractor-application
 * Captures contractor interest from /contractors/join landing page
 *
 * Features:
 * - Multi-field validation (business info, certifications, service areas)
 * - Duplicate email/ABN checking
 * - UTM parameter tracking for marketing attribution
 * - Confirmation email sending via Resend
 * - Rate limiting (5 applications per IP per day)
 * - Analytics event tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { basePrisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Resend client (only in runtime, not during build)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Initialize rate limiting (5 applications per day per IP) - only if Redis is configured
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, '1 d'),
        analytics: true,
        prefix: 'ratelimit:contractor-app',
      })
    : null;

// Validation schema
const contractorApplicationSchema = z.object({
  // Business Information
  businessName: z.string().min(2, 'Business name must be at least 2 characters').max(200),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?61[0-9\s-]{9,}$/, 'Invalid Australian phone number'),
  abn: z.string().regex(/^[0-9]{11}$/, 'ABN must be 11 digits'),

  // Certifications & Capabilities
  certifications: z
    .array(z.enum(['WATER_DAMAGE', 'FIRE_SMOKE', 'MOULD', 'TRAUMA', 'CONTENTS', 'ODOR', 'CARPET', 'OTHER']))
    .min(1, 'At least one certification is required'),
  serviceAreas: z.array(z.string()).min(1, 'At least one service area is required'),
  yearsInBusiness: z.number().int().min(0).max(100),

  // Marketing attribution (optional)
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
});

type ContractorApplicationData = z.infer<typeof contractorApplicationSchema>;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check (skip if not configured)
    if (ratelimit) {
      const ip =
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const { success, limit, remaining, reset } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          {
            success: false,
            error: 'Too many applications submitted. Please try again tomorrow.',
            rateLimit: {
              limit,
              remaining,
              reset: new Date(reset).toISOString(),
            },
          },
          { status: 429 }
        );
      }
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contractorApplicationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data: ContractorApplicationData = validationResult.data;

    // Check for duplicate email
    const existingEmail = await basePrisma.contractorApplication.findFirst({
      where: { email: data.email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'An application with this email already exists',
          message:
            'We already have your application! Our team will review it and contact you within 2-3 business days.',
        },
        { status: 409 }
      );
    }

    // Check for duplicate ABN
    const existingABN = await basePrisma.contractorApplication.findFirst({
      where: { abn: data.abn },
    });

    if (existingABN) {
      return NextResponse.json(
        {
          success: false,
          error: 'An application with this ABN already exists',
          message: 'This business has already applied. Please contact support if you have questions.',
        },
        { status: 409 }
      );
    }

    // Create contractor application
    const application = await basePrisma.contractorApplication.create({
      data: {
        businessName: data.businessName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        abn: data.abn,
        certifications: data.certifications,
        serviceAreas: data.serviceAreas,
        yearsInBusiness: data.yearsInBusiness,
        status: 'PENDING',
        source: data.source || 'contractor-join',
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        utmTerm: data.utmTerm,
      },
    });

    // Send confirmation email (non-blocking)
    sendApplicationReceivedEmail(application.email, application.contactName, application.businessName).catch(
      (error) => {
        console.error('[Contractor Application API] Failed to send confirmation email:', error);
        // Don't fail the request if email fails
      }
    );

    // Track analytics event (non-blocking)
    trackContractorApplicationConversion(application).catch((error) => {
      console.error('[Contractor Application API] Failed to track analytics:', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Application received! We will review it within 2-3 business days.',
        data: {
          id: application.id,
          businessName: application.businessName,
          status: application.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Contractor Application API] Error processing application:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your application. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * Send application received confirmation email via Resend
 */
async function sendApplicationReceivedEmail(
  email: string,
  contactName: string,
  businessName: string
): Promise<void> {
  const firstName = contactName.split(' ')[0];

  const subject = '✅ Application Received - NRPG Contractor Network';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - NRPG</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1A936F 0%, #004E89 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Application Received!</h1>
    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Thank you for applying to join the NRPG contractor network</p>
  </div>

  <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1F2937; margin-top: 0;">Hi ${firstName}! 👋</h2>

    <p style="color: #4B5563; margin-bottom: 20px;">
      Thank you for applying to join NRPG with <strong>${businessName}</strong>. We've successfully received your application and our verification team will review it shortly.
    </p>

    <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="color: #1E40AF; margin-top: 0; font-size: 18px;">📋 What Happens Next?</h3>
      <ol style="color: #1E3A8A; padding-left: 20px; margin-bottom: 0;">
        <li style="margin-bottom: 12px;"><strong>Verification Review (2-3 Business Days)</strong><br>
          <span style="color: #4B5563; font-size: 14px;">Our team will verify your IICRC certifications, business license (ABN), public liability insurance, and background check.</span>
        </li>
        <li style="margin-bottom: 12px;"><strong>Interview Call (If Required)</strong><br>
          <span style="color: #4B5563; font-size: 14px;">We may schedule a brief call to discuss your experience, service areas, and answer any questions you have.</span>
        </li>
        <li style="margin-bottom: 12px;"><strong>NRPG Training Certification (Required)</strong><br>
          <span style="color: #4B5563; font-size: 14px;">Complete all 24 NRPG training modules (approximately 22+ hours, self-paced). Training covers Safety, Legal, Documentation, Operations, Business, Restoration, and Platform Operations. Pass 315 assessment questions (80% minimum). Training investment: $1,495 AUD (one-time).</span>
        </li>
        <li style="margin-bottom: 0;"><strong>Start Receiving Jobs!</strong><br>
          <span style="color: #4B5563; font-size: 14px;">Once certified, you will be live on the platform and start receiving qualified leads in your service areas. Platform fee: $550 flat fee per claim (no commission), no monthly fees. Keep 100% of your revenue!</span>
        </li>
      </ol>
    </div>

    <h3 style="color: #1F2937; margin-top: 30px; font-size: 18px;">Complete Membership Requirements:</h3>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 6px; margin: 20px 0;">
      <ul style="color: #4B5563; padding-left: 20px; margin: 0;">
        <li>✓ <strong>NRPG Training:</strong> Complete all 24 certification modules (22+ hours) - $1,495 AUD</li>
        <li>✓ <strong>IICRC Certifications:</strong> At least one valid certification (WRT, ASD, FSR, AMRT, or CTS)</li>
        <li>✓ <strong>Business License:</strong> Valid Australian Business Number (ABN)</li>
        <li>✓ <strong>Public Liability Insurance:</strong> $10M+ coverage (current certificate required)</li>
        <li>✓ <strong>WorkCover:</strong> Workers Compensation (if you have employees)</li>
        <li>✓ <strong>Background Check:</strong> National police check (we can arrange this)</li>
        <li>✓ <strong>Experience:</strong> 2+ years in disaster recovery with verifiable references</li>
      </ul>
    </div>

    <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 30px 0; border-radius: 4px;">
      <p style="color: #92400E; margin: 0; font-size: 14px;">
        <strong>📄 Have Your Documents Ready:</strong> Our verification team may request copies of your certifications, insurance certificates, or business license. Having these ready will speed up the process!
      </p>
    </div>

    <h3 style="color: #1F2937; margin-top: 30px; font-size: 18px;">Questions?</h3>
    <p style="color: #4B5563; margin-bottom: 20px;">
      If you have any questions about your application or the verification process, don't hesitate to reach out:
    </p>

    <div style="background: #F3F4F6; padding: 20px; border-radius: 6px; margin: 20px 0;">
      <p style="color: #4B5563; margin: 0;">
        <strong>Email:</strong> <a href="mailto:contractors@disasterrecovery.com.au" style="color: #1A936F;">contractors@disasterrecovery.com.au</a><br>
        <strong>Phone:</strong> <span style="color: #6B7280;">[Business Phone Number]</span><br>
        <strong>Hours:</strong> <span style="color: #6B7280;">Monday-Friday, 9am-5pm AEST</span>
      </p>
    </div>

    <div style="text-align: center; margin-top: 40px;">
      <a href="https://disasterrecovery.com.au/contractors/join" style="display: inline-block; background: #1A936F; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View Application Status</a>
    </div>

    <p style="color: #6B7280; font-size: 14px; margin-top: 40px; padding-top: 30px; border-top: 1px solid #E5E7EB;">
      <strong>Application ID:</strong> ${email}<br>
      <strong>Business:</strong> ${businessName}<br><br>
      You're receiving this email because you submitted a contractor application at <a href="https://disasterrecovery.com.au" style="color: #1A936F;">disasterrecovery.com.au</a>.
      <br><br>
      <strong>NRPG - National Restoration Professionals Group</strong><br>
      Australia's Premier Disaster Recovery Network<br>
      <a href="mailto:contractors@disasterrecovery.com.au" style="color: #1A936F;">contractors@disasterrecovery.com.au</a>
    </p>
  </div>
</body>
</html>
  `;

  const textContent = `
Hi ${firstName}!

Thank you for applying to join NRPG with ${businessName}. We've successfully received your application and our verification team will review it shortly.

What Happens Next:
1. Verification Review (2-3 Business Days) - Our team will verify your IICRC certifications, business license (ABN), public liability insurance, and background check.
2. Interview Call (If Required) - We may schedule a brief call to discuss your experience and service areas.
3. Platform Training (30 Minutes) - Once approved, you'll receive training on how to use the NRPG platform.
4. Start Receiving Jobs! - After training, you'll be live and receiving qualified leads.

Questions? Contact us:
Email: contractors@disasterrecovery.com.au
Hours: Monday-Friday, 9am-5pm AEST

---
NRPG - National Restoration Professionals Group
Australia's Premier Disaster Recovery Network
contractors@disasterrecovery.com.au
  `;

  try {
    if (!resend) {
      console.warn('[Contractor Application API] Resend not configured, skipping email');
      return;
    }

    const result = await resend.emails.send({
      from: 'NRPG Contractor Team <contractors@disasterrecovery.com.au>',
      to: email,
      subject,
      html: htmlContent,
      text: textContent,
      tags: [
        { name: 'category', value: 'contractor-application' },
        { name: 'status', value: 'received' },
      ],
    });

    // Update application with email sent status
    await basePrisma.contractorApplication.update({
      where: { email },
      data: { emailSent: true },
    });

    console.log('[Contractor Application API] Confirmation email sent:', result);
  } catch (error) {
    console.error('[Contractor Application API] Failed to send email:', error);
    throw error;
  }
}

/**
 * Track analytics conversion event
 */
async function trackContractorApplicationConversion(application: any): Promise<void> {
  // This would integrate with your analytics system
  console.log('[Contractor Application API] Conversion tracked:', {
    id: application.id,
    businessName: application.businessName,
    certifications: application.certifications,
    serviceAreas: application.serviceAreas,
    source: application.source,
    utmCampaign: application.utmCampaign,
  });

  // TODO: Send to Google Analytics, Sentry breadcrumb, or custom analytics
  // This is a high-value conversion ($500)
}
