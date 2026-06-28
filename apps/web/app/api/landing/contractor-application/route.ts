/**
 * DEPRECATED — Contractor Application API (DR-878).
 *
 * The canonical contractor signup path is `/signup?type=contractor`
 * (→ POST /api/auth/register), which since DR-877 atomically creates the full
 * lifecycle (User + Contractor + ContractorOnboarding).
 *
 * This landing-page intake was orphaned (no UI ever POSTed to it) and created
 * `ContractorApplication` rows that nothing processed. It now returns 410 Gone to
 * prevent a dead-end signup path. The `ContractorApplication` model is retained for
 * now (no schema change); it can be removed in a later migration if confirmed unused.
 */

import { NextResponse } from 'next/server';

const GONE_BODY = {
  success: false,
  error: 'This endpoint has been removed. Contractors sign up at /signup?type=contractor.',
  canonicalPath: '/signup?type=contractor',
} as const;

export async function POST() {
  return NextResponse.json(GONE_BODY, { status: 410 });
}

export async function GET() {
  return NextResponse.json(GONE_BODY, { status: 410 });
}
