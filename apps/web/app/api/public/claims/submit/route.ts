/**
 * Public API - Claim Submission Endpoint
 *
 * Handles AI-automated claim intake with:
 * - Rate limiting (prevent spam)
 * - CAPTCHA verification
 * - Data validation
 * - Priority calculation
 * - Contractor matching (mock)
 * - Email notifications (mock)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { basePrisma } from '@/lib/prisma';
import { completeClaimSchema, calculatePriority } from '@/lib/claim-wizard/types';
import { verifyCaptcha } from '@/lib/services/captcha.service';

// Lazy-initialize Resend email service to avoid errors when API key is missing
let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// Rate limiting storage (in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 claims per hour per IP

// ============================================================================
// Rate Limiting
// ============================================================================

function getRateLimitKey(request: NextRequest): string {
  // Use X-Forwarded-For in production behind proxy
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return `claim_submit_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remainingRequests: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // No record or expired window
  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remainingRequests: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  // Within window
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remainingRequests: 0 };
  }

  // Increment count
  record.count++;
  return { allowed: true, remainingRequests: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Note: CAPTCHA verification is now handled by the captcha.service.ts
// The verifyCaptcha function is imported from there and handles:
// - Production: Always requires valid hCaptcha token
// - Development: Uses hCaptcha if configured, otherwise logs warning
// - Testing: Allows test tokens only in test environment

// ============================================================================
// Email Notification Service
// ============================================================================

async function sendClaimConfirmationEmail(
  claimId: string,
  clientName: string,
  clientEmail: string,
  suburb: string,
  disasterType: string,
  priority: string
): Promise<boolean> {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn('⚠️ RESEND_API_KEY not configured, skipping email');
      return false;
    }

    const response = await resend.emails.send({
      from: 'Disaster Recovery Australia <claims@disasterrecovery.com.au>',
      to: clientEmail,
      subject: `Your Disaster Recovery Claim #${claimId} Has Been Received`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .claim-ref { background: white; padding: 20px; border-left: 4px solid #059669; margin: 20px 0; border-radius: 4px; font-family: monospace; font-size: 18px; font-weight: bold; }
    .next-steps { background: white; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .next-steps ol { margin: 10px 0; padding-left: 20px; }
    .next-steps li { margin: 8px 0; }
    .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
    .alert { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Claim Received</h1>
      <p>Your disaster recovery claim has been successfully submitted</p>
    </div>

    <div class="content">
      <p>Hello ${clientName},</p>

      <p>Thank you for submitting your disaster recovery claim. We've received your information and our AI system is now matching you with IICRC-certified contractors in your area.</p>

      <div class="claim-ref">
        Claim Reference: ${claimId}
      </div>

      <div class="alert">
        <strong>⏱️ Important Timeline:</strong> You can expect to receive calls from contractors within the next 30 minutes.
      </div>

      <div class="next-steps">
        <h3>What Happens Next:</h3>
        <ol>
          <li><strong>Contractor Matching (Now)</strong> - Our AI is finding the best contractors for ${suburb}</li>
          <li><strong>Initial Contact (30 minutes)</strong> - Contractors will call to assess your ${disasterType}</li>
          <li><strong>Free Quotes (Same day)</strong> - Compare quotes and choose your preferred contractor</li>
          <li><strong>Work Begins</strong> - Often within 2 hours for ${priority === 'critical' ? 'emergency' : 'standard'} situations</li>
        </ol>
      </div>

      <p style="text-align: center;">
        <a href="https://disasterrecovery.com.au/claim/success?claimId=${claimId}" class="button">View Your Claim</a>
      </p>

      <h3>Important Information:</h3>
      <ul>
        <li>✓ All contractors are IICRC-certified and vetted</li>
        <li>✓ You're under no obligation to hire any contractor</li>
        <li>✓ Claims are encrypted and secure</li>
        <li>✓ We never share your data with anyone</li>
      </ul>

      <p>If you don't receive contractor calls within 45 minutes, please visit <strong>https://disasterrecovery.com.au/help-center</strong> or use your claim reference number: <strong>${claimId}</strong></p>

      <p>Best regards,<br><strong>Disaster Recovery Australia</strong><br>AI-Powered Disaster Recovery Matching</p>
    </div>

    <div class="footer">
      <p>© 2026 Disaster Recovery Australia. All rights reserved.<br>
      This is an automated email. Please do not reply to this address.</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (response.error) {
      console.error('Email sending error:', response.error);
      return false;
    }

    console.log('✓ Confirmation email sent to:', clientEmail);
    return true;
  } catch (error) {
    console.error('Email service error:', error);
    // Don't throw - email failures shouldn't block claim submission
    return false;
  }
}

// ============================================================================
// Claim Submission Handler
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many claim submissions. Please try again later.',
          retryAfter: 3600, // seconds
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();

    let validatedData;
    try {
      validatedData = completeClaimSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid claim data',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 3. Verify CAPTCHA
    const captchaValid = await verifyCaptcha(validatedData.captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'CAPTCHA verification failed',
        },
        { status: 400 }
      );
    }

    // 4. Calculate priority
    const priority = calculatePriority({
      step1: validatedData.step1,
      step2: validatedData.step2,
      step3: validatedData.step3,
      currentStep: 3,
      completedSteps: [1, 2, 3],
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });

    // 5. Generate claim ID
    const claimId = `CLM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // 6. REAL IMPLEMENTATION: Save claim to database using PublicClaim model
    let savedClaim;
    try {
      // Create a public claim record (pre-authentication intake)
      savedClaim = await basePrisma.publicClaim.create({
        data: {
          // Client Information
          clientName: validatedData.step2.name,
          clientEmail: validatedData.step2.email,
          clientPhone: validatedData.step2.phone,
          propertyAddress: validatedData.step2.propertyAddress,
          suburb: validatedData.step2.suburb,
          postcode: validatedData.step2.postcode,

          // Incident Details
          disasterType: validatedData.step1.disasterType,
          incidentDate: new Date(validatedData.step1.incidentDate),
          isOngoing: validatedData.step1.isOngoing === 'yes',
          isEmergency: validatedData.step1.isEmergency === 'yes',

          // Damage Details
          damageDescription: validatedData.step3.damageDescription,
          hasInsurance: validatedData.step3.hasInsurance === 'yes',
          insuranceProvider: validatedData.step3.insuranceProvider || null,
          policyNumber: validatedData.step3.policyNumber || null,

          // Assessment
          priority: priority.charAt(0).toUpperCase() + priority.slice(1), // Convert to Title Case
          status: 'PENDING',
        },
      });

      console.log('=== CLAIM SAVED TO DATABASE ===');
      console.log('Claim ID:', claimId);
      console.log('Database Record ID:', savedClaim.id);
      console.log('Priority:', priority);
      console.log('Client:', validatedData.step2.name, validatedData.step2.email);
      console.log('Location:', validatedData.step2.suburb, validatedData.step2.postcode);
      console.log('Disaster Type:', validatedData.step1.disasterType);
      console.log('Has Insurance:', validatedData.step3.hasInsurance);
      console.log('================================');

      // Send confirmation email (asynchronously, don't block response)
      sendClaimConfirmationEmail(
        claimId,
        validatedData.step2.name,
        validatedData.step2.email,
        validatedData.step2.suburb,
        validatedData.step1.disasterType,
        priority
      ).catch((error) => {
        console.error('Background email send failed:', error);
      });
    } catch (dbError) {
      console.error('Database error saving claim:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save claim to database',
        },
        { status: 500 }
      );
    }

    // 7. Contractor matching (will be implemented in next phase with real algorithm)
    const contractorCount = Math.floor(Math.random() * 3) + 1; // 1-3 contractors for now
    const estimatedResponseTime = priority === 'critical' ? '15 minutes' : '30 minutes';

    // 8. Return success response with saved claim data
    return NextResponse.json(
      {
        success: true,
        claimId,
        databaseId: savedClaim?.id,
        message: 'Claim submitted successfully and saved to database',
        estimatedContractorCalls: contractorCount,
        estimatedResponseTime,
        priority,
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remainingRequests.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Claim submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again.',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// OPTIONS Handler (CORS)
// ============================================================================

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
