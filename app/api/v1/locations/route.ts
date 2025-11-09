/**
 * Locations Endpoint - v1
 * Service areas and coverage information
 */

import { NextRequest } from 'next/server';
import { applyApiMiddleware } from '@/middleware/api';
import { cachedResponse, errorResponse } from '@/lib/api/response';
import { cacheAside, cacheKeys } from '@/lib/api/cache';
import { CACHE_DURATION } from '@/lib/api/config';
import { createRequestLogger } from '@/lib/api/logger';
import type { ServiceArea } from '@/lib/api/types';

/**
 * GET - List service areas
 */
export async function GET(request: NextRequest) {
  const reqLogger = createRequestLogger('GET', '/api/v1/locations');

  try {
    // Apply middleware
    const middlewareResponse = await applyApiMiddleware(request, {
      rateLimit: 'public',
      allowedMethods: ['GET', 'OPTIONS'],
    });

    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;
    const emergency = searchParams.get('emergency') === 'true';

    // Get locations with caching
    const cacheKey = cacheKeys.locations(type);
    const locations = await cacheAside(
      cacheKey,
      () => fetchServiceAreas(type, emergency),
      CACHE_DURATION.locations
    );

    reqLogger.complete(200, { count: locations.length });

    return cachedResponse(locations, CACHE_DURATION.locations);
  } catch (error) {
    reqLogger.error('Failed to fetch locations', error as Error);
    return errorResponse('Failed to fetch locations', 'INTERNAL_ERROR', 500);
  }
}

/**
 * Fetch service areas
 */
async function fetchServiceAreas(
  type?: string,
  emergency?: boolean
): Promise<ServiceArea[]> {
  const areas: ServiceArea[] = [
    // Brisbane High-Value Residential
    {
      id: 'hamilton',
      name: 'Hamilton',
      slug: 'hamilton',
      type: 'suburb',
      state: 'QLD',
      postcode: '4007',
      coordinates: { lat: -27.4389, lng: 153.0628 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '30 minutes',
    },
    {
      id: 'ascot',
      name: 'Ascot',
      slug: 'ascot',
      type: 'suburb',
      state: 'QLD',
      postcode: '4007',
      coordinates: { lat: -27.4306, lng: 153.0572 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '30 minutes',
    },
    {
      id: 'new-farm',
      name: 'New Farm',
      slug: 'new-farm',
      type: 'suburb',
      state: 'QLD',
      postcode: '4005',
      coordinates: { lat: -27.4642, lng: 153.0497 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '30 minutes',
    },
    {
      id: 'toowong',
      name: 'Toowong',
      slug: 'toowong',
      type: 'suburb',
      state: 'QLD',
      postcode: '4066',
      coordinates: { lat: -27.4847, lng: 152.9889 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '30 minutes',
    },
    // Ipswich High-Value Areas
    {
      id: 'karalee',
      name: 'Karalee',
      slug: 'karalee',
      type: 'suburb',
      state: 'QLD',
      postcode: '4306',
      coordinates: { lat: -27.5833, lng: 152.7833 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '45 minutes',
    },
    {
      id: 'brookwater',
      name: 'Brookwater',
      slug: 'brookwater',
      type: 'suburb',
      state: 'QLD',
      postcode: '4300',
      coordinates: { lat: -27.6667, lng: 152.9167 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '45 minutes',
    },
    {
      id: 'springfield-lakes',
      name: 'Springfield Lakes',
      slug: 'springfield-lakes',
      type: 'suburb',
      state: 'QLD',
      postcode: '4300',
      coordinates: { lat: -27.6667, lng: 152.9167 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '45 minutes',
    },
    // Commercial Areas
    {
      id: 'brisbane-cbd',
      name: 'Brisbane CBD',
      slug: 'brisbane-cbd',
      type: 'city',
      state: 'QLD',
      postcode: '4000',
      coordinates: { lat: -27.4698, lng: 153.0251 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm', 'commercial'],
      emergencyResponse: true,
      responseTime: '30 minutes',
    },
    {
      id: 'logan-central',
      name: 'Logan Central',
      slug: 'logan-central',
      type: 'city',
      state: 'QLD',
      postcode: '4114',
      coordinates: { lat: -27.6386, lng: 153.1094 },
      coverage: 'primary',
      services: ['water', 'fire', 'mould', 'storm', 'commercial'],
      emergencyResponse: true,
      responseTime: '60 minutes',
    },
    // Regional Coverage
    {
      id: 'brisbane-region',
      name: 'Greater Brisbane',
      slug: 'brisbane',
      type: 'region',
      state: 'QLD',
      coverage: 'secondary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '60 minutes',
    },
    {
      id: 'ipswich-region',
      name: 'Greater Ipswich',
      slug: 'ipswich',
      type: 'region',
      state: 'QLD',
      coverage: 'secondary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '90 minutes',
    },
    {
      id: 'logan-region',
      name: 'Logan Region',
      slug: 'logan',
      type: 'region',
      state: 'QLD',
      coverage: 'secondary',
      services: ['water', 'fire', 'mould', 'storm'],
      emergencyResponse: true,
      responseTime: '90 minutes',
    },
  ];

  // Apply filters
  let filtered = areas;

  if (type) {
    filtered = filtered.filter(a => a.type === type);
  }

  if (emergency) {
    filtered = filtered.filter(a => a.emergencyResponse);
  }

  return filtered;
}

/**
 * POST - Method not allowed
 */
export async function POST() {
  return errorResponse('Method not allowed. Use GET to retrieve locations.', 'METHOD_NOT_ALLOWED', 405);
}
