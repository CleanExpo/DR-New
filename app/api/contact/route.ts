import { NextRequest, NextResponse } from 'next/server';
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validatePostcode,
  sanitizeInput,
  checkRateLimit,
  logSecurityEvent,
  validateEmergencyRequest,
  encryptData,
} from '@/lib/security';

// Emergency contact form handler with comprehensive security
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Check rate limiting (stricter for contact forms)
    const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 300000); // 5 requests per 5 minutes
    if (!rateLimit.allowed) {
      logSecurityEvent('RATE_LIMIT', { ip: clientIp, endpoint: '/api/contact' });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '300',
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(rateLimit.resetTime),
          },
        }
      );
    }

    // Parse and validate request body
    let data;
    try {
      data = await request.json();
    } catch (error) {
      logSecurityEvent('VALIDATION_FAILURE', { ip: clientIp, error: 'Invalid JSON' });
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate all fields
    const validations = {
      firstName: validateName(data.firstName),
      lastName: validateName(data.lastName),
      email: validateEmail(data.email),
      phone: validatePhone(data.phone),
      postcode: validatePostcode(data.postcode),
      message: validateMessage(data.message),
    };

    // Check for validation errors
    const errors: Record<string, string> = {};
    for (const [field, result] of Object.entries(validations)) {
      if (!result.valid && result.error) {
        errors[field] = result.error;
      }
    }

    if (Object.keys(errors).length > 0) {
      logSecurityEvent('VALIDATION_FAILURE', { ip: clientIp, errors });
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      );
    }

    // Validate emergency type if provided
    let priority = 'MEDIUM';
    if (data.emergencyType) {
      const emergencyValidation = validateEmergencyRequest({
        type: data.emergencyType,
        severity: data.severity || 'medium',
        location: data.postcode,
      });

      if (!emergencyValidation.valid) {
        return NextResponse.json(
          { error: emergencyValidation.error },
          { status: 400 }
        );
      }
      priority = emergencyValidation.priority;
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeInput(data.firstName),
      lastName: sanitizeInput(data.lastName),
      email: sanitizeInput(data.email.toLowerCase()),
      phone: sanitizeInput(data.phone),
      postcode: sanitizeInput(data.postcode),
      suburb: sanitizeInput(data.suburb || ''),
      propertyType: sanitizeInput(data.propertyType || 'residential'),
      emergencyType: sanitizeInput(data.emergencyType || ''),
      severity: sanitizeInput(data.severity || 'medium'),
      message: sanitizeInput(data.message),
      priority,
      submittedAt: new Date().toISOString(),
      ip: clientIp,
    };

    // Encrypt sensitive data before storage/transmission
    const encryptedPhone = encryptData(sanitizedData.phone);
    const encryptedEmail = encryptData(sanitizedData.email);

    // Create secure submission object
    const submission = {
      ...sanitizedData,
      phone: encryptedPhone.encrypted,
      phoneIv: encryptedPhone.iv,
      email: encryptedEmail.encrypted,
      emailIv: encryptedEmail.iv,
    };

    // Here you would typically:
    // 1. Store in database with encryption
    // 2. Send notification to emergency team
    // 3. Send confirmation email to customer
    // 4. Create ticket in CRM system

    // For now, we'll log the submission (in production, use proper storage)
    console.log('[EMERGENCY_CONTACT] New submission:', {
      priority: submission.priority,
      type: submission.emergencyType,
      postcode: submission.postcode,
      timestamp: submission.submittedAt,
    });

    // Send appropriate response based on priority
    let responseMessage = 'Thank you for contacting Disaster Recovery Brisbane.';
    if (priority === 'HIGH') {
      responseMessage = 'Emergency request received. Our team will contact you within 1 hour.';
    } else if (priority === 'MEDIUM') {
      responseMessage = 'Your request has been prioritised. We will contact you within 2-4 hours.';
    } else {
      responseMessage = 'Your inquiry has been received. We will respond within 24 hours.';
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        referenceNumber: `DR${Date.now().toString(36).toUpperCase()}`,
        priority,
      },
      { status: 201 }
    );

  } catch (error) {
    // Log error securely (don't expose internal details)
    logSecurityEvent('SUSPICIOUS_ACTIVITY', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/contact',
    });

    return NextResponse.json(
      { error: 'An error occurred processing your request. Please call 1300 309 361 for immediate assistance.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    {
      status: 'operational',
      service: 'Disaster Recovery Brisbane Contact API',
      emergency: '1300 309 361'
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    }
  );
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecovery.com.au',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      'Access-Control-Max-Age': '86400',
    },
  });
}