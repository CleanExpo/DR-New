import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),

  phone: z.string()
    .min(8, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/, 'Invalid Australian phone number'),

  service: z.enum(['water', 'fire', 'mould', 'storm', 'biohazard', 'other'], {
    errorMap: () => ({ message: 'Invalid service type' })
  }),

  urgency: z.enum(['emergency', 'urgent', 'standard', 'quote', 'routine'], {
    errorMap: () => ({ message: 'Invalid urgency level' })
  }),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  propertyType: z.string().optional(),
  hasInsurance: z.boolean().optional(),
  preferredContact: z.string().optional()
});

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Save submission to JSON file
async function saveSubmission(submission: any): Promise<string> {
  const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
  const submissionsFile = path.join(submissionsDir, 'contacts.json');

  // Create directory if it doesn't exist
  if (!existsSync(submissionsDir)) {
    await mkdir(submissionsDir, { recursive: true });
  }

  // Read existing submissions
  let submissions = [];
  if (existsSync(submissionsFile)) {
    const fileContent = await readFile(submissionsFile, 'utf-8');
    try {
      submissions = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error parsing submissions file:', error);
      submissions = [];
    }
  }

  // Generate submission ID
  const submissionId = `DR-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // Add new submission
  const newSubmission = {
    id: submissionId,
    ...submission,
    submittedAt: new Date().toISOString(),
    status: 'new'
  };

  submissions.push(newSubmission);

  // Keep only last 1000 submissions
  if (submissions.length > 1000) {
    submissions = submissions.slice(-1000);
  }

  // Save to file
  await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

  return submissionId;
}

// Send email notification (optional - only if configured)
async function sendEmailNotification(submission: any): Promise<void> {
  // Check if email service is configured
  const emailService = process.env.EMAIL_SERVICE;
  const emailApiKey = process.env.EMAIL_API_KEY;

  if (!emailService || !emailApiKey) {
    console.log('Email service not configured, skipping notification');
    return;
  }

  // TODO: Implement email sending based on your email service
  // Example services: SendGrid, AWS SES, Mailgun, Resend
  console.log('Email notification would be sent for submission:', submission.id);
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      return NextResponse.json(
        {
          success: false,
          message: `Validation error: ${errors}`
        },
        { status: 400 }
      );
    }

    // Sanitize all string inputs
    const sanitizedData = {
      name: sanitizeInput(validationResult.data.name),
      email: validationResult.data.email.toLowerCase().trim(),
      phone: validationResult.data.phone.replace(/\s+/g, ''), // Remove spaces
      service: validationResult.data.service,
      urgency: validationResult.data.urgency,
      message: sanitizeInput(validationResult.data.message),
      propertyType: validationResult.data.propertyType,
      hasInsurance: validationResult.data.hasInsurance,
      preferredContact: validationResult.data.preferredContact,
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Save submission
    const submissionId = await saveSubmission(sanitizedData);

    // Send email notification (async, don't wait for it)
    sendEmailNotification({ id: submissionId, ...sanitizedData }).catch(err => {
      console.error('Error sending email notification:', err);
    });

    // Log submission (for monitoring)
    console.log(`New contact submission: ${submissionId} from ${ip}`);
    console.log(`Service: ${sanitizedData.service}, Urgency: ${sanitizedData.urgency}`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        submissionId,
        message: 'Your request has been received. We will contact you shortly.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred processing your request. Please try again or call 1300 309 361.'
      },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed. Use POST to submit contact form.'
    },
    { status: 405 }
  );
}
