/**
 * Contact Form Endpoint - v1
 * General inquiries and service requests
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
  contactFormSchema,
  sanitizeObject,
  getClientIP,
  getUserAgent,
} from '@/lib/api/validation';
import { logger, createRequestLogger } from '@/lib/api/logger';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { ContactRequest, ContactResponse } from '@/lib/api/types';

/**
 * POST - Submit contact form
 */
export async function POST(request: NextRequest) {
  const reqLogger = createRequestLogger('POST', '/api/v1/contact');

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
    const validation = validateRequest(contactFormSchema, body);

    if (!validation.success) {
      logger.api.validation(validation.errors);
      return validationErrorResponse(validation.errors);
    }

    // Sanitize input
    const sanitizedData = sanitizeObject(validation.data);

    // Get client info
    const ip = getClientIP(request.headers);
    const userAgent = getUserAgent(request.headers);

    // Generate submission ID
    const submissionId = `CT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Save contact submission
    await saveContactSubmission({
      ...sanitizedData,
      id: submissionId,
      ip,
      userAgent,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    // Log submission
    logger.api.submission('Contact', submissionId, {
      service: sanitizedData.service,
      urgency: sanitizedData.urgency,
      hasInsurance: sanitizedData.hasInsurance,
    });

    // Determine expected response time
    let expectedResponse = '24 hours';
    if (sanitizedData.urgency === 'emergency') {
      expectedResponse = '60 minutes';
    } else if (sanitizedData.urgency === 'urgent') {
      expectedResponse = '4 hours';
    }

    // Prepare response
    const response: ContactResponse = {
      success: true,
      submissionId,
      message: 'Your message has been received. We will contact you shortly.',
      expectedResponse,
    };

    reqLogger.complete(201);

    return createdResponse(response, 'Contact form submitted successfully');
  } catch (error) {
    reqLogger.error('Failed to process contact form', error as Error);
    return errorResponse(
      'Failed to process your request. Please try again or call 1300 309 361.',
      'CONTACT_ERROR',
      500
    );
  }
}

/**
 * GET - Method not allowed
 */
export async function GET() {
  return errorResponse('Method not allowed. Use POST to submit contact form.', 'METHOD_NOT_ALLOWED', 405);
}

/**
 * Save contact submission to storage
 */
async function saveContactSubmission(submission: any): Promise<void> {
  const dir = path.join(process.cwd(), 'data', 'submissions');
  const file = path.join(dir, 'contacts.json');

  // Create directory if needed
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  // Read existing submissions
  let submissions = [];
  if (existsSync(file)) {
    try {
      const content = await readFile(file, 'utf-8');
      submissions = JSON.parse(content);
    } catch (error) {
      console.error('Error reading contact submissions:', error);
      submissions = [];
    }
  }

  // Add new submission
  submissions.push(submission);

  // Keep only last 1000 submissions
  if (submissions.length > 1000) {
    submissions = submissions.slice(-1000);
  }

  // Save to file
  await writeFile(file, JSON.stringify(submissions, null, 2));

  // TODO: Send email notification
  // TODO: Create CRM ticket
  // TODO: Log to monitoring system
}
