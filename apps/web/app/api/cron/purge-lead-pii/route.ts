/**
 * Lead PII retention purge (DR-858 N-09).
 *
 * Anonymises ContactEnquiry rows older than LEAD_PII_RETENTION_DAYS (default 365)
 * by nulling the personal fields and stamping `piiPurgedAt`. Aggregate/status
 * data is retained; PII is not. Idempotent — already-purged rows are skipped.
 *
 * Schedule via Vercel cron; guarded by CRON_SECRET like other cron routes.
 */
import { NextRequest, NextResponse } from 'next/server';
import { basePrisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidCronRequest(request: NextRequest): boolean {
  const provided =
    request.headers.get('x-vercel-cron-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  const expected = process.env.CRON_SECRET;
  if (process.env.NODE_ENV === 'development' && !expected) return true;
  if (!expected) return false;
  return provided === expected;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const retentionDays = parseInt(process.env.LEAD_PII_RETENTION_DAYS || '365', 10);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);

  const result = await basePrisma.contactEnquiry.updateMany({
    where: { submittedAt: { lt: cutoff }, piiPurgedAt: null },
    data: {
      firstName: '[purged]',
      lastName: '[purged]',
      email: '[purged]',
      phone: null,
      ipAddress: null,
      userAgent: null,
      piiPurgedAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    retentionDays,
    cutoff: cutoff.toISOString(),
    purgedContactEnquiries: result.count,
  });
}
