// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z, ZodError } from 'zod';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { TenantService } from '@/lib/tenant-service';
import { createTenantCheckoutSession } from '@/lib/stripe/tenant-subscription';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email/resend';

const signupSchema = z.object({
  // Tenant info
  tenantName: z.string().min(2, 'Tenant name must be at least 2 characters'),
  subdomain: z.string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(63, 'Subdomain must be at most 63 characters')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens')
    .regex(/^[a-z0-9]/, 'Subdomain must start with a letter or number')
    .regex(/[a-z0-9]$/, 'Subdomain must end with a letter or number'),
  industry: z.string().optional(),

  // Admin user info
  adminName: z.string().min(1, 'Admin name is required'),
  adminEmail: z.string().email('Invalid email address'),
  adminPassword: z.string().min(8, 'Password must be at least 8 characters'),

  // Billing tier
  tier: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).default('BASIC'),

  // Optional branding
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
});

/**
 * UNI-160: Public Tenant Signup Endpoint
 *
 * Creates a new tenant with admin user and initiates Stripe checkout if paid tier selected.
 *
 * Flow:
 * 1. Validate input data
 * 2. Check subdomain availability
 * 3. Create tenant with industry defaults
 * 4. Create admin user linked to tenant
 * 5. Create Stripe checkout session (if not trial)
 * 6. Return tenant info + checkout URL
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = signupSchema.parse(body);

    // 1. Check subdomain availability
    const existingTenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { subdomain: data.subdomain },
          { domain: `${data.subdomain}.${process.env.BASE_DOMAIN || 'disasterrecovery.com.au'}` }
        ]
      }
    });

    if (existingTenant) {
      return createErrorResponse(
        ErrorCode.DUPLICATE_RESOURCE,
        'This subdomain is already taken. Please choose another.',
        409
      );
    }

    // 2. Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email: data.adminEmail }
    });

    if (existingUser) {
      return createErrorResponse(
        ErrorCode.DUPLICATE_RESOURCE,
        'This email is already registered. Please use a different email or login.',
        409
      );
    }

    // 3. Create tenant with industry defaults
    const industry = data.industry || 'restoration';
    const defaultConfigs = TenantService.getDefaultIndustryConfigs(industry);

    const tenant = await TenantService.createTenant({
      name: data.tenantName,
      subdomain: data.subdomain,
      industry,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      subscriptionTier: data.tier,
      subscriptionStatus: 'TRIAL', // Start with trial
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
      configurations: defaultConfigs,
    });

    // 4. Create admin user
    const hashedPassword = await hash(data.adminPassword, 12);

    const adminUser = await prisma.user.create({
      data: {
        email: data.adminEmail,
        name: data.adminName,
        password: hashedPassword,
        userType: 'ADMIN',
        tenantId: tenant.id,
        isEmailVerified: false, // Require email verification
        emailVerificationToken: generateVerificationToken(),
        emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    });

    // 5. Create Stripe checkout session for paid tier
    let checkoutSession = null;
    if (data.tier !== 'BASIC') {
      try {
        checkoutSession = await createTenantCheckoutSession({
          tenantId: tenant.id,
          tenantName: tenant.name,
          adminEmail: data.adminEmail,
          tier: data.tier,
        });
      } catch (stripeError) {
        console.error('Stripe checkout creation failed:', stripeError);
        // Don't fail the entire signup, just log the error
        // Admin can set up billing later
      }
    }

    // 6. Send verification email
    try {
      if (adminUser.emailVerificationToken) {
        const emailResult = await sendVerificationEmail(
          adminUser.email,
          adminUser.emailVerificationToken,
          adminUser.name || undefined
        );

        if (!emailResult.success) {
          console.warn('Verification email could not be sent:', emailResult.error);
          // Don't fail the signup if email fails - user can resend later
        }
      }
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        industry: tenant.industry,
        subscriptionTier: tenant.subscriptionTier,
        subscriptionStatus: tenant.subscriptionStatus,
        trialEndsAt: tenant.trialEndsAt,
      },
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
      },
      checkoutUrl: checkoutSession?.url || null,
      message: 'Tenant created successfully. Please verify your email to activate your account.',
    }, { status: 201 });

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * Generate a random verification token
 */
function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36);
}
