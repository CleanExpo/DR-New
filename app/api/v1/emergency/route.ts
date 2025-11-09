/**
 * Emergency Booking Endpoint - v1
 * 24/7 emergency disaster recovery requests
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
  emergencyRequestSchema,
  sanitizeObject,
  getClientIP,
} from '@/lib/api/validation';
import { logger, createRequestLogger } from '@/lib/api/logger';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { EmergencyRequest, EmergencyResponse } from '@/lib/api/types';

/**
 * POST - Submit emergency request
 */
export async function POST(request: NextRequest) {
  const reqLogger = createRequestLogger('POST', '/api/v1/emergency');

  try {
    // Apply middleware
    const middlewareResponse = await applyApiMiddleware(request, {
      rateLimit: 'emergency',
      allowedMethods: ['POST', 'OPTIONS'],
    });

    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateRequest(emergencyRequestSchema, body);

    if (!validation.success) {
      logger.api.validation(validation.errors);
      return validationErrorResponse(validation.errors);
    }

    // Sanitize input
    const sanitizedData = sanitizeObject(validation.data);

    // Get client info
    const ip = getClientIP(request.headers);

    // Generate emergency request ID
    const requestId = `EM-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Determine priority and response time
    const priority = sanitizedData.severity === 'critical' ? 'emergency' : 'urgent';
    const estimatedResponse = priority === 'emergency' ? '30 minutes' : '60 minutes';

    // Save emergency request
    await saveEmergencyRequest({
      ...sanitizedData,
      id: requestId,
      priority,
      ip,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    // Log submission
    logger.api.submission('Emergency', requestId, {
      type: sanitizedData.emergencyType,
      severity: sanitizedData.severity,
      suburb: sanitizedData.suburb,
      hasInsurance: sanitizedData.hasInsurance,
    });

    // Prepare response
    const response: EmergencyResponse = {
      requestId,
      estimatedResponse,
      priority,
      message: 'Emergency request received. Our team will contact you immediately.',
      nextSteps: [
        'Our emergency response team has been notified',
        `You will receive a call within ${estimatedResponse}`,
        'Keep your phone nearby',
        'If situation worsens, call 1300 309 361 immediately',
      ],
      contactPhone: '1300 309 361',
    };

    reqLogger.complete(201);

    return createdResponse(response, 'Emergency request submitted successfully');
  } catch (error) {
    reqLogger.error('Failed to process emergency request', error as Error);
    return errorResponse(
      'Failed to process emergency request. Please call 1300 309 361 immediately.',
      'EMERGENCY_ERROR',
      500
    );
  }
}

/**
 * GET - Method not allowed
 */
export async function GET() {
  return errorResponse('Method not allowed. Use POST to submit emergency requests.', 'METHOD_NOT_ALLOWED', 405);
}

/**
 * Save emergency request to storage
 */
async function saveEmergencyRequest(request: any): Promise<void> {
  const dir = path.join(process.cwd(), 'data', 'emergency');
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
      console.error('Error reading emergency requests:', error);
      requests = [];
    }
  }

  // Add new request
  requests.push(request);

  // Keep only last 500 requests
  if (requests.length > 500) {
    requests = requests.slice(-500);
  }

  // Save to file
  await writeFile(file, JSON.stringify(requests, null, 2));

  // TODO: Send immediate notifications to on-call team
  // TODO: Create priority dispatch ticket
  // TODO: Log to monitoring system
}
