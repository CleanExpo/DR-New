/**
 * Services Endpoint - v1
 * List and filter disaster recovery services
 */

import { NextRequest } from 'next/server';
import { applyApiMiddleware } from '@/middleware/api';
import { cachedResponse, errorResponse, paginatedResponse } from '@/lib/api/response';
import { validateRequest, serviceFiltersSchema } from '@/lib/api/validation';
import { cacheAside, cacheKeys } from '@/lib/api/cache';
import { CACHE_DURATION } from '@/lib/api/config';
import { createRequestLogger } from '@/lib/api/logger';
import type { Service, ServiceFilters } from '@/lib/api/types';

/**
 * GET - List services with optional filtering
 */
export async function GET(request: NextRequest) {
  const reqLogger = createRequestLogger('GET', '/api/v1/services');

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
    const filters: ServiceFilters = {
      category: searchParams.get('category') || undefined,
      availability: searchParams.get('availability') as any,
      location: searchParams.get('location') || undefined,
      emergency: searchParams.get('emergency') === 'true',
      search: searchParams.get('search') || undefined,
    };

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Validate filters
    const validation = validateRequest(serviceFiltersSchema, {
      ...filters,
      page,
      limit,
    });

    if (!validation.success) {
      return errorResponse('Invalid filters', 'VALIDATION_ERROR', 400, {
        errors: validation.errors,
      });
    }

    // Get services with caching
    const cacheKey = cacheKeys.services(JSON.stringify(filters));
    const allServices = await cacheAside(cacheKey, () => fetchServices(filters), CACHE_DURATION.services);

    // Apply pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedServices = allServices.slice(start, end);

    reqLogger.complete(200, { count: paginatedServices.length, total: allServices.length });

    return paginatedResponse(paginatedServices, page, limit, allServices.length);
  } catch (error) {
    reqLogger.error('Failed to fetch services', error as Error);
    return errorResponse('Failed to fetch services', 'INTERNAL_ERROR', 500);
  }
}

/**
 * Fetch services from data source
 */
async function fetchServices(filters: ServiceFilters): Promise<Service[]> {
  // Master Restorer services for Brisbane, Ipswich, Logan
  const services: Service[] = [
    {
      id: 'water-damage-restoration',
      slug: 'water-damage-restoration',
      name: 'Water Damage Restoration',
      category: 'water',
      description: 'Emergency water damage restoration and drying services',
      features: [
        '24/7 Emergency Response',
        'Water Extraction',
        'Structural Drying',
        'Moisture Detection',
        'Insurance Documentation',
      ],
      responseTime: '60 minutes',
      available24x7: true,
      certifications: ['IICRC Certified', 'Master Restorer'],
      serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    },
    {
      id: 'fire-damage-restoration',
      slug: 'fire-damage-restoration',
      name: 'Fire Damage Restoration',
      category: 'fire',
      description: 'Complete fire and smoke damage restoration services',
      features: [
        'Smoke Odor Removal',
        'Soot Cleaning',
        'Structural Repairs',
        'Content Restoration',
        'Board-Up Services',
      ],
      responseTime: '60 minutes',
      available24x7: true,
      certifications: ['IICRC Certified', 'Master Restorer'],
      serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    },
    {
      id: 'mould-remediation',
      slug: 'mould-remediation',
      name: 'Mould Remediation',
      category: 'mould',
      description: 'Professional mould inspection, removal and prevention',
      features: [
        'Mould Inspection',
        'Safe Removal',
        'Air Quality Testing',
        'Prevention Treatment',
        'Health & Safety Compliance',
      ],
      responseTime: '24 hours',
      available24x7: false,
      certifications: ['IICRC Certified', 'Master Restorer'],
      serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    },
    {
      id: 'storm-damage-repair',
      slug: 'storm-damage-repair',
      name: 'Storm Damage Repair',
      category: 'storm',
      description: 'Emergency storm and weather damage restoration',
      features: [
        'Emergency Tarping',
        'Roof Repairs',
        'Water Removal',
        'Tree Removal Coordination',
        'Structural Assessment',
      ],
      responseTime: '60 minutes',
      available24x7: true,
      certifications: ['IICRC Certified', 'Master Restorer', 'QBCC Licensed'],
      serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    },
    {
      id: 'commercial-restoration',
      slug: 'commercial-restoration',
      name: 'Commercial Property Restoration',
      category: 'commercial',
      description: 'Large-scale commercial property disaster recovery',
      features: [
        'Minimal Business Disruption',
        'Large-Scale Projects',
        'After-Hours Service',
        'Project Management',
        'Insurance Liaison',
      ],
      responseTime: '2 hours',
      available24x7: true,
      certifications: ['IICRC Certified', 'Master Restorer', 'QBCC Licensed'],
      serviceAreas: ['Brisbane CBD', 'Ipswich', 'Logan'],
    },
  ];

  // Apply filters
  let filtered = services;

  if (filters.category) {
    filtered = filtered.filter(s => s.category === filters.category);
  }

  if (filters.availability === '24x7') {
    filtered = filtered.filter(s => s.available24x7);
  }

  if (filters.emergency) {
    filtered = filtered.filter(s => s.available24x7);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      s =>
        s.name.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.features.some(f => f.toLowerCase().includes(search))
    );
  }

  if (filters.location) {
    const location = filters.location.toLowerCase();
    filtered = filtered.filter(s =>
      s.serviceAreas.some(area => area.toLowerCase().includes(location))
    );
  }

  return filtered;
}

/**
 * POST - Method not allowed
 */
export async function POST() {
  return errorResponse('Method not allowed. Use GET to retrieve services.', 'METHOD_NOT_ALLOWED', 405);
}
