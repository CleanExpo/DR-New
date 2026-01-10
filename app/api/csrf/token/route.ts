import { NextRequest, NextResponse } from 'next/server';
import { generateCsrfToken } from '@/src/lib/security/csrf';

/**
 * GET /api/csrf/token
 * Generate a new CSRF token for client-side form submissions
 */
export async function GET(request: NextRequest) {
  try {
    const csrfSecret = process.env.CSRF_SECRET;
    if (!csrfSecret || csrfSecret.length < 32) {
      return NextResponse.json(
        { error: 'CSRF configuration error' },
        { status: 500 }
      );
    }

    const token = generateCsrfToken(csrfSecret);

    // Set secure HTTP-only cookie for CSRF validation
    const response = NextResponse.json({ token });
    response.cookies.set('csrfToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
