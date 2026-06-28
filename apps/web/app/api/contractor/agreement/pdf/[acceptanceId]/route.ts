import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth-middleware';
import { ownsContractorResource } from '@/lib/contractor-identity';
import { getPresignedDownloadUrl } from '@/lib/storage/cloud-storage';

/**
 * GET /api/contractor/agreement/pdf/[acceptanceId] (DR-888)
 *
 * Returns a short-TTL signed URL to the executed ICA PDF. The owning contractor
 * (contractorId === user.id, Option B) or an ADMIN/SUPER_ADMIN may fetch it; any
 * other user gets 403. A missing acceptance or one without a generated PDF → 404.
 */
const SIGNED_URL_TTL_SECONDS = 300;

export async function GET(
  request: NextRequest,
  { params }: { params: { acceptanceId: string } }
) {
  const auth = await authenticateRequest(request);
  if (!auth.success) return auth.response;

  const { user } = auth.context;

  const acceptance = await prisma.contractorAgreementAcceptance.findUnique({
    where: { id: params.acceptanceId },
    select: { contractorId: true, signedPdfUrl: true },
  });

  if (!acceptance) {
    return NextResponse.json(
      { success: false, error: 'Agreement record not found' },
      { status: 404 }
    );
  }

  // Authorize before revealing whether a PDF exists (no cross-tenant leakage).
  if (!ownsContractorResource(user, acceptance.contractorId)) {
    return NextResponse.json(
      { success: false, error: 'Not authorized to access this agreement' },
      { status: 403 }
    );
  }

  if (!acceptance.signedPdfUrl) {
    return NextResponse.json(
      { success: false, error: 'No executed PDF available for this agreement' },
      { status: 404 }
    );
  }

  const url = await getPresignedDownloadUrl(
    acceptance.signedPdfUrl,
    SIGNED_URL_TTL_SECONDS
  );

  return NextResponse.json({
    success: true,
    data: { url, expiresIn: SIGNED_URL_TTL_SECONDS },
  });
}
