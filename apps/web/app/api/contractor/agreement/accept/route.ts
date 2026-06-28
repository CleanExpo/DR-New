import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth-middleware';
import { contractorKey } from '@/lib/contractor-identity';
import { getClientIp } from '@/lib/net/client-ip';
import { ICA_VERSION } from '@/lib/legal/ica';
import { getIcaDocumentHash } from '@/lib/legal/ica-hash';
import { generateIcaPdf } from '@/lib/legal/ica-pdf';
import { uploadFile } from '@/lib/storage/cloud-storage';
import { handleValidationError, handleUnexpectedError } from '@/lib/api-errors';

const acceptSchema = z.object({
  // The version the contractor saw and is accepting. Must equal the current
  // canonical version or we reject (stale agreement in the browser).
  version: z.string().min(1),
  // Typed signature — the contractor's legal name.
  signedName: z.string().min(2, 'Signature is required'),
  // Scroll-gate + checkbox are enforced client-side; we also require the server
  // to be told both were satisfied, and reject otherwise.
  scrolledToEnd: z.literal(true, {
    errorMap: () => ({ message: 'You must read the full agreement before signing' }),
  }),
  agreed: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the agreement to continue' }),
  }),
});

/**
 * POST /api/contractor/agreement/accept (DR-886)
 *
 * Records a contractor's acceptance of the current ICA version. Server-authoritative:
 * the server sets acceptedAt, the client IP, and the documentHash; the client only
 * signals scroll-gate + checkbox + typed signature.
 *
 * Preconditions: authenticated CONTRACTOR, email verified, ABN present on profile,
 * and the typed signature must match the contractor's profile legal name.
 *
 * Idempotent for the current version (accepting again returns the existing row).
 * Accepting a newer version supersedes prior-version acceptances (DR-889 reads this).
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    if (!auth.success) return auth.response;

    const { user } = auth.context;

    if (user.userType !== 'CONTRACTOR') {
      return NextResponse.json(
        { success: false, error: 'Only contractors can sign the agreement' },
        { status: 403 }
      );
    }

    // Precondition: email must be verified before signing.
    if (!user.isEmailVerified) {
      return NextResponse.json(
        { success: false, error: 'Verify your email before signing the agreement' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const data = acceptSchema.parse(body);

    // Reject a stale agreement loaded in the browser.
    if (data.version !== ICA_VERSION) {
      return NextResponse.json(
        {
          success: false,
          error: 'The agreement has been updated. Reload and review the current version before signing.',
          currentVersion: ICA_VERSION,
        },
        { status: 409 }
      );
    }

    // Precondition: ABN present on the contractor profile.
    const contractor = await prisma.contractor.findUnique({
      where: { userId: user.id },
      select: { abnNumber: true },
    });
    if (!contractor?.abnNumber) {
      return NextResponse.json(
        { success: false, error: 'Complete your NRPG registration (ABN required) before signing' },
        { status: 400 }
      );
    }

    // Signature legal-name must match the profile name (case-insensitive, trimmed).
    const profileName = (user.name ?? '').trim();
    if (!profileName) {
      return NextResponse.json(
        { success: false, error: 'No legal name on file; update your profile before signing' },
        { status: 400 }
      );
    }
    if (data.signedName.trim().toLowerCase() !== profileName.toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Typed signature must match your registered legal name',
        },
        { status: 400 }
      );
    }

    const contractorId = contractorKey(user);
    const documentHash = getIcaDocumentHash();
    const ipAddress = getClientIp(request);
    const userAgent = request.headers.get('user-agent') ?? undefined;

    // Idempotent for the current version: if already accepted, return it.
    const existing = await prisma.contractorAgreementAcceptance.findUnique({
      where: { contractorId_version: { contractorId, version: ICA_VERSION } },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          data: { id: existing.id, version: existing.version, acceptedAt: existing.acceptedAt },
          alreadyAccepted: true,
        },
        { status: 200 }
      );
    }

    // Insert the new acceptance row. Re-signing a newer version yields a NEW row
    // (the @@unique is on contractorId+version, so different versions coexist).
    const created = await prisma.contractorAgreementAcceptance.create({
      data: {
        contractorId,
        version: ICA_VERSION,
        documentHash,
        signedName: data.signedName.trim(),
        signatureType: 'typed',
        ipAddress,
        userAgent,
      },
    });

    // Generate + store the tamper-evident signed PDF atomically with the row:
    // if PDF generation or upload fails, the acceptance must NOT persist, so we
    // delete the just-created row and fail the request. (Storage I/O can't live
    // inside a prisma transaction, hence the manual compensating delete.)
    let acceptance;
    try {
      const { bytes, pdfHash } = await generateIcaPdf({
        version: ICA_VERSION,
        documentHash,
        signedName: created.signedName,
        acceptedAt: created.acceptedAt,
        ipAddress,
      });

      const storageKey = `ica-agreements/${contractorId}/${created.id}-${ICA_VERSION}.pdf`;
      await uploadFile(storageKey, bytes, {
        contentType: 'application/pdf',
        acl: 'private',
      });

      acceptance = await prisma.contractorAgreementAcceptance.update({
        where: { id: created.id },
        data: {
          signedPdfUrl: storageKey,
          signedPdfHash: pdfHash,
          pdfGeneratedAt: new Date(),
        },
      });

      // Only after the executed PDF exists do we supersede prior-version rows.
      await prisma.contractorAgreementAcceptance.updateMany({
        where: {
          contractorId,
          version: { not: ICA_VERSION },
          supersededAt: null,
        },
        data: { supersededAt: new Date() },
      });
    } catch (pdfError) {
      // Roll back: the acceptance is only valid with its executed PDF.
      await prisma.contractorAgreementAcceptance
        .delete({ where: { id: created.id } })
        .catch(() => undefined);
      console.error('[agreement/accept] PDF generation/upload failed:', pdfError);
      return NextResponse.json(
        { success: false, error: 'Could not finalise the signed agreement. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: acceptance.id,
          version: acceptance.version,
          acceptedAt: acceptance.acceptedAt,
          documentHash: acceptance.documentHash,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) return handleValidationError(error);
    return handleUnexpectedError(error);
  }
}
