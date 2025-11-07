import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Generate CSRF token
export async function GET(...args: any[]): Promise<void> {
  try {
    // Generate secure random token
    const token = crypto.randomBytes(32).toString('hex');

    // Store token in HTTP-only cookie
    const response = NextResponse.json({
      token,
      expiresIn: 3600 // 1 hour
    });

    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    });

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');

    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// Validate CSRF token
export async function POST(...args: any[]): Promise<void> {
  try {
    const { token } = await request.json();
    const storedToken = request.cookies.get('csrf-token')?.value;

    if (!token || !storedToken) {
      return NextResponse.json(
        { valid: false, error: 'Missing token' },
        { status: 400 }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const valid = crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(storedToken)
    );

    return NextResponse.json({ valid });
  } catch (error) {
    console.error('CSRF validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}