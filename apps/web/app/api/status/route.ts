/**
 * Status Check Endpoint - GET /api/status
 *
 * Alternative health check endpoint.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'API is running',
  });
}
