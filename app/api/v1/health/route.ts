/**
 * API Health Check Endpoint - v1
 * Health and status monitoring
 */

import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/api/response';
import { getCacheStats } from '@/lib/api/cache';

/**
 * GET - API Health Check
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Get cache statistics
  const cacheStats = getCacheStats();

  // Check system health
  const health = {
    status: 'healthy',
    version: 'v1',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
    cache: {
      enabled: true,
      entries: cacheStats.size,
    },
    endpoints: {
      emergency: '/api/v1/emergency',
      services: '/api/v1/services',
      locations: '/api/v1/locations',
      contact: '/api/v1/contact',
      quote: '/api/v1/quote',
    },
    responseTime: `${Date.now() - startTime}ms`,
  };

  return successResponse(health, 'API is healthy');
}

/**
 * HEAD - Quick health check
 */
export async function HEAD() {
  return new Response(null, { status: 200 });
}
