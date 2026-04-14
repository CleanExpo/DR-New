/**
 * Contractor Application Submission API
 *
 * POST /api/public/contractor/application
 * Public endpoint — no auth required.
 * Persists the application to ContractorApplication, then sends confirmation emails.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  contractorApplicationReceived,
  adminNewApplication,
  sendTemplateEmail,
} from '@/lib/email/templates';
import { prisma } from '@/lib/prisma';

// Validation schema
const applicationSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  abn: z.string().regex(/^\d{11}$/, 'ABN must be 11 digits'),
  acn: z.string().optional(),
  primaryContactName: z.string().min(1, 'Contact name is required'),
  primaryContactPhone: z.string().min(1, 'Phone number is required'),
  primaryContactEmail: z.string().email('Valid email is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
  serviceAreas: z.array(z.string()).min(1, 'At least one service area is required'),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  certifications: z.array(z.string()).min(1, 'At least one certification is required'),
  selectedTier: z.enum(['basic', 'pro', 'enterprise']),
  yearsInBusiness: z.number().int().min(0).default(0),
  // UTM attribution (optional — captured from query params or body)
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
});

type ApplicationInput = z.infer<typeof applicationSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = applicationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Internal notes capture fields the model doesn't have dedicated columns for.
    const internalNotes = [
      `Business address: ${data.businessAddress}`,
      `Specializations: ${data.specializations.join(', ')}`,
      `Selected tier: ${data.selectedTier}`,
      data.acn ? `ACN: ${data.acn}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    // Persist the application to the database.
    const application = await prisma.contractorApplication.create({
      data: {
        businessName: data.businessName,
        contactName: data.primaryContactName,
        email: data.primaryContactEmail,
        phone: data.primaryContactPhone,
        abn: data.abn,
        certifications: data.certifications,
        serviceAreas: data.serviceAreas,
        yearsInBusiness: data.yearsInBusiness,
        status: 'PENDING',
        notes: internalNotes,
        // UTM attribution
        source: data.source ?? null,
        utmSource: data.utmSource ?? null,
        utmMedium: data.utmMedium ?? null,
        utmCampaign: data.utmCampaign ?? null,
        utmContent: data.utmContent ?? null,
        utmTerm: data.utmTerm ?? null,
      },
    });

    // Send confirmation emails and mark the record accordingly.
    const emailSent = await sendApplicationEmails(data, application.id);

    if (emailSent) {
      await prisma.contractorApplication.update({
        where: { id: application.id },
        data: { emailSent: true },
      });
    }

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        message:
          'Application submitted successfully. The team will review it within 24–48 hours.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contractor application submission error:', message);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Send application confirmation emails to the contractor and admin.
 * Returns true if both sends succeeded (best-effort — does not throw).
 */
async function sendApplicationEmails(
  data: ApplicationInput,
  applicationId: string
): Promise<boolean> {
  let allSent = true;

  const contractorTemplate = contractorApplicationReceived({
    businessName: data.businessName,
    contactName: data.primaryContactName,
    applicationId,
    tier: data.selectedTier,
  });

  const contractorResult = await sendTemplateEmail({
    to: data.primaryContactEmail,
    subject: contractorTemplate.subject,
    htmlContent: contractorTemplate.htmlContent,
    textContent: contractorTemplate.textContent,
  });

  if (!contractorResult.success) {
    console.error('Failed to send contractor confirmation email:', contractorResult.error);
    allSent = false;
  }

  const adminTemplate = adminNewApplication({
    businessName: data.businessName,
    abn: data.abn,
    contactName: data.primaryContactName,
    contactEmail: data.primaryContactEmail,
    tier: data.selectedTier,
    applicationId,
  });

  const adminResult = await sendTemplateEmail({
    to: process.env.ADMIN_EMAIL ?? 'applications@disasterrecovery.com.au',
    subject: adminTemplate.subject,
    htmlContent: adminTemplate.htmlContent,
    textContent: adminTemplate.textContent,
  });

  if (!adminResult.success) {
    console.error('Failed to send admin notification email:', adminResult.error);
    allSent = false;
  }

  return allSent;
}
