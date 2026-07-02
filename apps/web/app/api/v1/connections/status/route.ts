/**
 * Connection Readiness Manifest — GET /api/v1/connections/status (UNI-2139)
 *
 * Public, secret-free endpoint for Unite-Group Mission Control to poll
 * DR-NRPG integration readiness. Presence-only env checks — never values.
 */

import { NextResponse } from 'next/server';
import { buildDrNrpgConnectionStatus } from '@/lib/connections/status';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(buildDrNrpgConnectionStatus());
}
