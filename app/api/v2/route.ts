/**
 * API v2 - Root Endpoint
 * API versioning with content negotiation
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    version: '2.0.0',
    status: 'active',
    endpoints: {
      enquiries: '/api/v2/enquiries',
      health: '/api/v2/health',
    },
    deprecation: {
      v1: {
        status: 'deprecated',
        sunsetDate: '2026-12-31',
        migrationGuide: '/docs/api/v1-to-v2-migration',
      },
    },
    documentation: '/docs/api/v2',
  });
}
