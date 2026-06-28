import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation-schemas';
import { handleValidationError, handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { ZodError } from 'zod';
import { authRateLimiter } from '@/lib/api/redis-rate-limit';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email/resend';

/**
 * POST /api/auth/register
 * Registers a new user account
 *
 * @implements Anthropic best practices:
 * - Centralized Zod validation
 * - Secure password hashing (bcrypt rounds=12)
 * - Duplicate email check
 * - Structured error responses
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent brute force registration attempts
    const rateLimitResult = await authRateLimiter(request);
    if (rateLimitResult) return rateLimitResult;

    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'An account with this email already exists',
        400
      );
    }

    // Hash password with bcrypt (12 rounds for security)
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user account with a single-use email-verification token (24h expiry).
    // Uses the User.emailVerificationToken field — the same mechanism the GET
    // /api/auth/verify-email link validates against.
    const verificationToken = randomBytes(32).toString('hex');
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        userType: validatedData.userType,
        emailVerificationToken: verificationToken,
        emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    // Send the verification email. A send failure must NOT fail registration —
    // the user can re-request via the resend flow.
    try {
      await sendVerificationEmail(user.email, verificationToken, user.name ?? undefined);
    } catch (emailError) {
      console.error('[register] verification email send failed:', emailError);
    }

    // Return success with user data (excluding password)
    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.userType,
            avatar: user.avatar,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
