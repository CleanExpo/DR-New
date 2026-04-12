/**
 * Professional Commitment Framework API — DR-192
 *
 * GET  /api/nrpg/commitment-framework — fetch the current contractor's signing status
 * POST /api/nrpg/commitment-framework — submit completed digital signing
 *
 * Training access is blocked until status === "SIGNED".
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getClientIp } from '@/lib/security/rate-limit';

// ---------------------------------------------------------------------------
// Auth helper
// ---------------------------------------------------------------------------

async function requireContractor() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  // Contractors and admins may sign
  if (!['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

// ---------------------------------------------------------------------------
// GET — fetch signing status
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const record = await prisma.commitmentFramework.findUnique({
    where: { contractorId: user.id ?? '' },
    select: {
      id: true,
      status: true,
      signedAt: true,
      commitmentAgreementAccepted: true,
      codeOfEthicsAccepted: true,
      insuranceRequirementsConfirmed: true,
      whsComplianceAccepted: true,
      rateCardAgreed: true,
      documentUrl: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    signed: record?.status === 'SIGNED',
    record: record ?? null,
  });
}

// ---------------------------------------------------------------------------
// POST — submit digital signing
// ---------------------------------------------------------------------------

const SigningSchema = z.object({
  commitmentAgreementAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Professional Commitment Agreement' }),
  }),
  codeOfEthicsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge the Code of Ethics' }),
  }),
  insuranceRequirementsConfirmed: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm your insurance requirements' }),
  }),
  whsComplianceAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge WHS compliance obligations' }),
  }),
  rateCardAgreed: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the rate card (minimum $750 job charge)' }),
  }),
});

export async function POST(request: NextRequest) {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  // Prevent re-signing if already SIGNED
  const existing = await prisma.commitmentFramework.findUnique({
    where: { contractorId: user.id ?? '' },
    select: { id: true, status: true },
  });

  if (existing?.status === 'SIGNED') {
    return NextResponse.json(
      { error: 'Commitment framework already signed', alreadySigned: true },
      { status: 409 }
    );
  }

  const body = await request.json();
  const parsed = SigningSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'All sections must be accepted before signing',
        details: parsed.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 422 }
    );
  }

  const now = new Date();
  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent') ?? '';

  const record = await prisma.commitmentFramework.upsert({
    where: { contractorId: user.id ?? '' },
    create: {
      contractorId: user.id ?? '',
      commitmentAgreementAccepted: true,
      commitmentAgreementAcceptedAt: now,
      codeOfEthicsAccepted: true,
      codeOfEthicsAcceptedAt: now,
      insuranceRequirementsConfirmed: true,
      insuranceRequirementsAt: now,
      whsComplianceAccepted: true,
      whsComplianceAcceptedAt: now,
      rateCardAgreed: true,
      rateCardAgreedAt: now,
      status: 'SIGNED',
      signedAt: now,
      signerIp: clientIp,
      signerAgent: userAgent.substring(0, 500),
    },
    update: {
      commitmentAgreementAccepted: true,
      commitmentAgreementAcceptedAt: now,
      codeOfEthicsAccepted: true,
      codeOfEthicsAcceptedAt: now,
      insuranceRequirementsConfirmed: true,
      insuranceRequirementsAt: now,
      whsComplianceAccepted: true,
      whsComplianceAcceptedAt: now,
      rateCardAgreed: true,
      rateCardAgreedAt: now,
      status: 'SIGNED',
      signedAt: now,
      signerIp: clientIp,
      signerAgent: userAgent.substring(0, 500),
    },
    select: {
      id: true,
      status: true,
      signedAt: true,
    },
  });

  // Fire-and-forget audit log
  prisma.auditLog
    .create({
      data: {
        action: 'COMMITMENT_FRAMEWORK_SIGNED',
        resourceType: 'CommitmentFramework',
        resourceId: record.id,
        userId: user.id ?? '',
        severity: 'INFO',
        metadata: { signedAt: now.toISOString(), ip: clientIp },
        ipAddress: clientIp,
        userAgent: userAgent.substring(0, 500),
      },
    })
    .catch((err: unknown) => console.error('[commitment-framework] audit log error:', err));

  return NextResponse.json(
    {
      success: true,
      message:
        'Professional Commitment Framework signed. Your training portal access is now active.',
      record: {
        id: record.id,
        status: record.status,
        signedAt: record.signedAt,
      },
    },
    { status: 201 }
  );
}
