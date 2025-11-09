/**
 * Quote Request Endpoint - v1
 * Request quotes for disaster recovery services
 */

import { NextRequest } from 'next/server';
import { applyApiMiddleware } from '@/middleware/api';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  createdResponse,
} from '@/lib/api/response';
import {
  validateRequest,
  quoteRequestSchema,
  sanitizeObject,
  getClientIP,
  getUserAgent,
} from '@/lib/api/validation';
import { logger, createRequestLogger } from '@/lib/api/logger';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { QuoteRequest, QuoteResponse } from '@/lib/api/types';

/**
 * POST - Submit quote request
 */
export async function POST(request: NextRequest) {
  const reqLogger = createRequestLogger('POST', '/api/v1/quote');

  try {
    // Apply middleware
    const middlewareResponse = await applyApiMiddleware(request, {
      rateLimit: 'contact',
      allowedMethods: ['POST', 'OPTIONS'],
    });

    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateRequest(quoteRequestSchema, body);

    if (!validation.success) {
      logger.api.validation(validation.errors);
      return validationErrorResponse(validation.errors);
    }

    // Sanitize input
    const sanitizedData = sanitizeObject(validation.data);

    // Get client info
    const ip = getClientIP(request.headers);
    const userAgent = getUserAgent(request.headers);

    // Generate quote ID
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Save quote request
    await saveQuoteRequest({
      ...sanitizedData,
      id: quoteId,
      ip,
      userAgent,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    // Log submission
    logger.api.submission('Quote', quoteId, {
      serviceType: sanitizedData.serviceType,
      propertyType: sanitizedData.propertyType,
      urgency: sanitizedData.urgency,
      suburb: sanitizedData.suburb,
    });

    // Determine response time based on urgency
    let estimatedResponseTime = '24 hours';
    if (sanitizedData.urgency === 'emergency') {
      estimatedResponseTime = '1 hour';
    } else if (sanitizedData.urgency === 'urgent') {
      estimatedResponseTime = '4 hours';
    }

    // Prepare response
    const response: QuoteResponse = {
      quoteId,
      estimatedResponseTime,
      message: 'Quote request received. We will contact you with a detailed quote.',
      services: sanitizedData.serviceType,
    };

    reqLogger.complete(201);

    return createdResponse(response, 'Quote request submitted successfully');
  } catch (error) {
    reqLogger.error('Failed to process quote request', error as Error);
    return errorResponse(
      'Failed to process quote request. Please try again or call 1300 309 361.',
      'QUOTE_ERROR',
      500
    );
  }
}

/**
 * GET - Retrieve quote status (optional feature)
 */
export async function GET(request: NextRequest) {
  const reqLogger = createRequestLogger('GET', '/api/v1/quote');

  try {
    // Apply middleware
    const middlewareResponse = await applyApiMiddleware(request, {
      rateLimit: 'general',
      allowedMethods: ['GET', 'POST', 'OPTIONS'],
    });

    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Get quote ID from query
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id');

    if (!quoteId) {
      return errorResponse('Quote ID is required', 'VALIDATION_ERROR', 400);
    }

    // Retrieve quote (placeholder - implement actual retrieval)
    const quote = await getQuoteById(quoteId);

    if (!quote) {
      return errorResponse('Quote not found', 'NOT_FOUND', 404);
    }

    reqLogger.complete(200);

    return successResponse({
      id: quote.id,
      status: quote.status,
      submittedAt: quote.submittedAt,
      estimatedResponseTime: quote.estimatedResponseTime || '24 hours',
    });
  } catch (error) {
    reqLogger.error('Failed to retrieve quote', error as Error);
    return errorResponse('Failed to retrieve quote', 'INTERNAL_ERROR', 500);
  }
}

/**
 * Save quote request to storage
 */
async function saveQuoteRequest(request: any): Promise<void> {
  const dir = path.join(process.cwd(), 'data', 'quotes');
  const file = path.join(dir, 'requests.json');

  // Create directory if needed
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  // Read existing requests
  let requests = [];
  if (existsSync(file)) {
    try {
      const content = await readFile(file, 'utf-8');
      requests = JSON.parse(content);
    } catch (error) {
      console.error('Error reading quote requests:', error);
      requests = [];
    }
  }

  // Add new request
  requests.push(request);

  // Keep only last 1000 requests
  if (requests.length > 1000) {
    requests = requests.slice(-1000);
  }

  // Save to file
  await writeFile(file, JSON.stringify(requests, null, 2));

  // TODO: Send email notification
  // TODO: Create quote in system
  // TODO: Assign to estimator
}

/**
 * Get quote by ID (placeholder)
 */
async function getQuoteById(quoteId: string): Promise<any | null> {
  const file = path.join(process.cwd(), 'data', 'quotes', 'requests.json');

  if (!existsSync(file)) {
    return null;
  }

  try {
    const content = await readFile(file, 'utf-8');
    const requests = JSON.parse(content);
    return requests.find((r: any) => r.id === quoteId) || null;
  } catch (error) {
    console.error('Error reading quote:', error);
    return null;
  }
}
