import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken, generateVerificationToken } from '@/lib/auth';
import { prisma, findUserByEmail } from '@/lib/db';
import { validateRequest, formatZodErrors } from '@/lib/validation';
import { authRateLimiter } from '@/lib/api/redis-rate-limit';
import { sendVerificationEmail } from '@/lib/email/resend';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

const resendVerificationSchema = z.object({
  email: z.string().email(),
});

/**
 * UNI-161: Email Verification (GET method for URL-based verification)
 *
 * Supports the UNI-160 tenant onboarding flow where verification token
 * is stored directly on the User model (emailVerificationToken field).
 *
 * GET /api/auth/verify-email?token=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Verification token is required',
        400
      );
    }

    // Find user by verification token (UNI-160 approach)
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
      include: {
        tenant: true,
      },
    });

    if (!user) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Invalid or expired verification token',
        400
      );
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        message: 'Email already verified. You can log in to your account.',
      });
    }

    // Check if token has expired
    if (user.emailVerificationTokenExpiry && user.emailVerificationTokenExpiry < new Date()) {
      return createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'Verification token has expired. Please request a new verification email.',
        400
      );
    }

    // Mark user as verified and clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiry: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! You can now log in to your account.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isEmailVerified: true,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

// Verify email with token (POST method for programmatic verification)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent brute force verification attempts
    const rateLimitResult = await authRateLimiter(request);
    if (rateLimitResult) return rateLimitResult;

    const body = await request.json();

    const validation = validateRequest(verifyEmailSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { token } = validation.data;

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded || decoded.type !== 'email-verification') {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Check if token exists in DB
    const storedToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (!storedToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Update user and delete token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: decoded.userId },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: { id: storedToken.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Resend verification email
export async function PUT(request: NextRequest) {
  try {
    // Rate limiting - prevent email spam
    const rateLimitResult = await authRateLimiter(request);
    if (rateLimitResult) return rateLimitResult;

    const body = await request.json();

    const validation = validateRequest(resendVerificationSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    const user = await findUserByEmail(email);
    if (!user) {
      // Return success for security
      return NextResponse.json({
        success: true,
        message: 'If the email exists, a verification email has been sent',
      });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { success: false, error: 'Email already verified' },
        { status: 400 }
      );
    }

    // Delete existing tokens
    await prisma.verificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate new token
    const verificationToken = generateVerificationToken(user.id);

    // Store token
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(user.email, verificationToken, user.name || undefined);
    if (!emailResult.success) {
      console.warn('Verification email could not be sent:', emailResult.error);
      // Still return success to avoid revealing if email exists
    }

    return NextResponse.json({
      success: true,
      message: 'If the email exists, a verification email has been sent',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
