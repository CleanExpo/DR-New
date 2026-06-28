import { NextResponse } from 'next/server';
import {
  ICA_VERSION,
  ICA_TITLE,
  ICA_SUBTITLE,
  ICA_LAST_UPDATED,
  ICA_SECTIONS,
  getIcaCanonicalText,
} from '@/lib/legal/ica';
import { getIcaDocumentHash } from '@/lib/legal/ica-hash';

/**
 * GET /api/contractor/agreement
 *
 * Serves the current Independent Contractor Agreement from the one canonical
 * source (DR-885). Returns the version, structured sections (for display), the
 * canonical plain text, and its SHA-256 documentHash so the accept flow can
 * submit the exact version/hash the contractor saw.
 *
 * No PII — safe to serve without authentication.
 */
export async function GET() {
  const documentHash = getIcaDocumentHash();

  return NextResponse.json({
    success: true,
    data: {
      version: ICA_VERSION,
      title: ICA_TITLE,
      subtitle: ICA_SUBTITLE,
      lastUpdated: ICA_LAST_UPDATED,
      documentHash,
      sections: ICA_SECTIONS,
      canonicalText: getIcaCanonicalText(),
    },
  });
}
