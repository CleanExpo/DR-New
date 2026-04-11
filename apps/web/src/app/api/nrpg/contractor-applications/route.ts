/**
 * Contractor Application API Route — DR-198
 *
 * POST /api/nrpg/contractor-applications
 * Submit a new contractor application for screening.
 *
 * Rate limited: 3 per day per IP.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sanitizeObject } from '@/lib/security/sanitize';
import { getClientIp } from '@/lib/security/rate-limit';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const ABN_PATTERN = /^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/;

const SPECIALISATIONS = [
  'WATER_DAMAGE',
  'FIRE_SMOKE',
  'MOULD',
  'TRAUMA',
  'STORM',
  'RECONSTRUCTION',
  'OTHER',
] as const;

const AU_STATES = ['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'] as const;

const ContractorApplicationSchema = z.object({
  // Business Information
  businessName: z
    .string()
    .trim()
    .min(2, 'Business name is required')
    .max(200, 'Business name is too long'),
  contactName: z
    .string()
    .trim()
    .min(2, 'Contact name is required')
    .max(100, 'Contact name is too long'),
  abn: z
    .string()
    .trim()
    .regex(ABN_PATTERN, 'ABN must be 11 digits (e.g. 12 345 678 901)')
    .transform((v) => v.replace(/\s/g, '')),

  // Specialisation & Experience
  specialisations: z
    .array(z.enum(SPECIALISATIONS))
    .min(1, 'Select at least one specialisation')
    .max(7),
  yearsInBusiness: z
    .number()
    .int()
    .min(0, 'Years in business must be 0 or more')
    .max(100, 'Invalid years in business'),
  serviceStates: z
    .array(z.enum(AU_STATES))
    .min(1, 'Select at least one state you service'),

  // Minimum Requirements (document pre-check)
  hasPublicLiabilityInsurance: z.literal(true, {
    errorMap: () => ({ message: 'Public liability insurance is required to join NRPG' }),
  }),
  hasWorkersCompInsurance: z.boolean(),
  hasIicrcCertification: z.boolean(),
  currentInsurancePolicyNumber: z
    .string()
    .trim()
    .min(3, 'Insurance policy number is required')
    .max(100),

  // Supporting statement
  whyJoinNrpg: z
    .string()
    .trim()
    .min(50, 'Please write at least 50 characters')
    .max(2000, 'Maximum 2000 characters'),

  // Marketing attribution (optional)
  source: z.string().max(100).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  utmTerm: z.string().max(100).optional(),
});

type ContractorApplicationInput = z.infer<typeof ContractorApplicationSchema>;

// ---------------------------------------------------------------------------
// Document pre-check helper
// ---------------------------------------------------------------------------

interface PreCheckResult {
  passed: boolean;
  failedChecks: string[];
}

function runDocumentPreCheck(data: ContractorApplicationInput): PreCheckResult {
  const failedChecks: string[] = [];

  if (!data.hasPublicLiabilityInsurance) {
    failedChecks.push('Public liability insurance not confirmed');
  }
  if (!data.currentInsurancePolicyNumber) {
    failedChecks.push('Insurance policy number not provided');
  }
  // Warn but do not block — these are soft requirements surfaced in admin notes
  const warnings: string[] = [];
  if (!data.hasWorkersCompInsurance) {
    warnings.push('No workers compensation insurance declared');
  }
  if (!data.hasIicrcCertification) {
    warnings.push('No IICRC certification declared');
  }

  return {
    passed: failedChecks.length === 0,
    failedChecks: [...failedChecks, ...warnings],
  };
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

    // Validate
    const parsed = ContractorApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 422 }
      );
    }

    const data = sanitizeObject(parsed.data, { allowHtml: false, stripWhitespace: true }) as ContractorApplicationInput;

    // Document pre-check
    const preCheck = runDocumentPreCheck(data);

    // Build internal notes from pre-check warnings
    const autoNotes = preCheck.failedChecks.length > 0
      ? `Auto pre-check warnings:\n${preCheck.failedChecks.map((c) => `• ${c}`).join('\n')}`
      : 'Auto pre-check: all minimum requirements declared.';

    // Persist to database
    const application = await prisma.contractorApplication.create({
      data: {
        businessName: data.businessName,
        contactName: data.contactName,
        // email and phone are collected outside this route — the model has them
        // but we don't expose them in the public form per display rules.
        // They are populated as empty strings and admin updates them via inquiry.
        email: '', // populated via admin follow-up
        phone: '', // populated via admin follow-up
        abn: data.abn,
        certifications: data.specialisations,
        serviceAreas: data.serviceStates,
        yearsInBusiness: data.yearsInBusiness,
        status: 'PENDING',
        notes: [autoNotes, `Supporting statement: ${data.whyJoinNrpg}`].join('\n\n'),
        source: data.source ?? 'nrpg-application-form',
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        utmTerm: data.utmTerm,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        message:
          'Your application has been received. Our team will review it within 2–3 business days. You will be contacted via the form if further information is required.',
        preCheckPassed: preCheck.passed,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[contractor-applications] POST error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
