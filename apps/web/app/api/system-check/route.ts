/**
 * System Check Endpoint - GET /api/system-check
 * Created: 2026-01-13
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    service: 'nrpg-platform'
  });
}
