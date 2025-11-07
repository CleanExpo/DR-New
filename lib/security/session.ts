import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Session configuration
const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  cookieName: '__Secure-session',
  maxAge: 24 * 60 * 60, // 24 hours
  refreshThreshold: 60 * 60, // Refresh if less than 1 hour remaining
  secureCookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/'
  }
};

// Session data interface
interface SessionData {
  userId?: string;
  email?: string;
  role?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: number;
  expiresAt: number;
  csrfToken: string;
  sessionId: string;
  lastActivity: number;
  metadata?: Record<string, any>;
}

// Session fingerprint for additional security
interface SessionFingerprint {
  ipAddress: string;
  userAgent: string;
  acceptLanguage: string;
  acceptEncoding: string;
}

// Create session fingerprint
function createFingerprint(headers: Headers): SessionFingerprint {
  return {
    ipAddress: headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               headers.get('x-real-ip') ||
               'unknown',
    userAgent: headers.get('user-agent') || 'unknown',
    acceptLanguage: headers.get('accept-language') || 'unknown',
    acceptEncoding: headers.get('accept-encoding') || 'unknown'
  };
}

// Hash fingerprint for comparison
function hashFingerprint(fingerprint: SessionFingerprint): string {
  const data = JSON.stringify(fingerprint);
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
}

// Generate secure session ID
function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generate CSRF token
function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Encrypt session data
async function encryptSession(data: SessionData): Promise<string> {
  try {
    const secret = new TextEncoder().encode(SESSION_CONFIG.secret);

    const jwt = await new SignJWT({ ...data })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${SESSION_CONFIG.maxAge}s`)
      .sign(secret);

    return jwt;
  } catch (error) {
    console.error(`Error in encryptSession:`, error);
    throw error;
  }
}

// Decrypt session data
async function decryptSession(token: string): Promise<SessionData | null> {
  try {
    const secret = new TextEncoder().encode(SESSION_CONFIG.secret);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256']
    });

    return payload as unknown as SessionData;
  } catch (error) {
    console.error('Session decryption failed:', error);
    return null;
  }
}

// Create new session
export async function createSession(
  userData: {
    userId: string;
    email: string;
    role?: string;
    metadata?: Record<string, any>;
  },
  headers: Headers
): Promise<{ sessionId: string; csrfToken: string }> {
  const now = Date.now();
  const fingerprint = createFingerprint(headers);

  const sessionData: SessionData = {
    ...userData,
    sessionId: generateSessionId(),
    csrfToken: generateCSRFToken(),
    createdAt: now,
    expiresAt: now + (SESSION_CONFIG.maxAge * 1000),
    lastActivity: now,
    ipAddress: fingerprint.ipAddress,
    userAgent: fingerprint.userAgent
  };

  const encryptedSession = await encryptSession(sessionData);

  // Store session in cookie
  const cookieStore = cookies();
  cookieStore.set(SESSION_CONFIG.cookieName, encryptedSession, {
    ...SESSION_CONFIG.secureCookieOptions,
    maxAge: SESSION_CONFIG.maxAge
  });

  // Store fingerprint hash for validation
  cookieStore.set('__Secure-fp', hashFingerprint(fingerprint), {
    ...SESSION_CONFIG.secureCookieOptions,
    maxAge: SESSION_CONFIG.maxAge
  });

  return {
    sessionId: sessionData.sessionId,
    csrfToken: sessionData.csrfToken
  };
}

// Validate session
export async function validateSession(
  headers: Headers
): Promise<SessionData | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_CONFIG.cookieName);
    const fingerprintCookie = cookieStore.get('__Secure-fp');

    if (!sessionCookie || !fingerprintCookie) {
      return null;
    }

    // Decrypt session
    const sessionData = await decryptSession(sessionCookie.value);
    if (!sessionData) {
      return null;
    }

    // Check expiration
    if (Date.now() > sessionData.expiresAt) {
      await destroySession();
      return null;
    }

    // Validate fingerprint
    const currentFingerprint = createFingerprint(headers);
    const currentFingerprintHash = hashFingerprint(currentFingerprint);

    if (currentFingerprintHash !== fingerprintCookie.value) {
      // Fingerprint mismatch - possible session hijacking
      console.warn('Session fingerprint mismatch detected');
      await destroySession();
      return null;
    }

    // Check for session fixation
    if (sessionData.ipAddress !== currentFingerprint.ipAddress) {
      console.warn('IP address change detected in session');
      // You might want to require re-authentication here
    }

    // Refresh session if needed
    const timeRemaining = sessionData.expiresAt - Date.now();
    if (timeRemaining < SESSION_CONFIG.refreshThreshold * 1000) {
      await refreshSession(sessionData, headers);
    }

    return sessionData;
  } catch (error) {
    console.error(`Error in validateSession:`, error);
    return null;
  }
}

// Refresh session
async function refreshSession(
  sessionData: SessionData,
  headers: Headers
): Promise<void> {
  try {
    const now = Date.now();
    const updatedSession: SessionData = {
      ...sessionData,
      expiresAt: now + (SESSION_CONFIG.maxAge * 1000),
      lastActivity: now,
      csrfToken: generateCSRFToken() // Rotate CSRF token
    };

    const encryptedSession = await encryptSession(updatedSession);

    const cookieStore = cookies();
    cookieStore.set(SESSION_CONFIG.cookieName, encryptedSession, {
      ...SESSION_CONFIG.secureCookieOptions,
      maxAge: SESSION_CONFIG.maxAge
    });

    // Update fingerprint
    const fingerprint = createFingerprint(headers);
    cookieStore.set('__Secure-fp', hashFingerprint(fingerprint), {
      ...SESSION_CONFIG.secureCookieOptions,
      maxAge: SESSION_CONFIG.maxAge
    });
  } catch (error) {
    console.error(`Error in refreshSession:`, error);
    throw error;
  }
}

// Destroy session
export async function destroySession(): Promise<void> {
  try {
    const cookieStore = cookies();
    cookieStore.delete(SESSION_CONFIG.cookieName);
    cookieStore.delete('__Secure-fp');
    cookieStore.delete('csrf-token');
  } catch (error) {
    console.error(`Error in destroySession:`, error);
    throw error;
  }
}

// Get CSRF token from session
export async function getCSRFToken(headers: Headers): Promise<string | null> {
  try {
    const sessionData = await validateSession(headers);
    return sessionData?.csrfToken || null;
  } catch (error) {
    console.error(`Error in getCSRFToken:`, error);
    return null;
  }
}

// Validate CSRF token
export async function validateCSRFToken(
  token: string,
  headers: Headers
): Promise<boolean> {
  try {
    const sessionData = await validateSession(headers);
    if (!sessionData) return false;

    return sessionData.csrfToken === token;
  } catch (error) {
    console.error(`Error in validateCSRFToken:`, error);
    return false;
  }
}

// Session activity tracking
export async function updateSessionActivity(headers: Headers): Promise<void> {
  try {
    const sessionData = await validateSession(headers);
    if (!sessionData) return;

    const updatedSession: SessionData = {
      ...sessionData,
      lastActivity: Date.now()
    };

    const encryptedSession = await encryptSession(updatedSession);

    const cookieStore = cookies();
    cookieStore.set(SESSION_CONFIG.cookieName, encryptedSession, {
      ...SESSION_CONFIG.secureCookieOptions,
      maxAge: SESSION_CONFIG.maxAge
    });
  } catch (error) {
    console.error(`Error in updateSessionActivity:`, error);
    throw error;
  }
}

// Check if session is about to expire
export async function isSessionExpiring(headers: Headers): Promise<boolean> {
  try {
    const sessionData = await validateSession(headers);
    if (!sessionData) return false;

    const timeRemaining = sessionData.expiresAt - Date.now();
    return timeRemaining < 5 * 60 * 1000; // Less than 5 minutes
  } catch (error) {
    console.error(`Error in isSessionExpiring:`, error);
    return false;
  }
}

// Session rate limiting
const sessionAttempts = new Map<string, { count: number; resetTime: number }>();

export function checkSessionRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempt = sessionAttempts.get(identifier);

  if (!attempt || now > attempt.resetTime) {
    sessionAttempts.set(identifier, {
      count: 1,
      resetTime: now + 900000 // 15 minutes
    });
    return true;
  }

  if (attempt.count >= 5) {
    // Max 5 login attempts per 15 minutes
    return false;
  }

  attempt.count++;
  return true;
}

// Clean up expired sessions periodically
export function cleanupExpiredSessions(): void {
  const now = Date.now();
  for (const [key, value] of sessionAttempts.entries()) {
    if (now > value.resetTime) {
      sessionAttempts.delete(key);
    }
  }
}

// Session encryption key rotation (for production)
export async function rotateSessionKeys(): Promise<void> {
  try {
    // This should be implemented with proper key management service
    // For now, we just log the action
    // In production, you would:
    // 1. Generate new encryption key
    // 2. Re-encrypt all active sessions with new key
    // 3. Update SESSION_CONFIG.secret
    // 4. Maintain old key for grace period
    console.log('Session key rotation triggered');
  } catch (error) {
    console.error(`Error in rotateSessionKeys:`, error);
    throw error;
  }
}

// Export session configuration for testing
export const getSessionConfig = () => ({
  ...SESSION_CONFIG,
  secret: '[REDACTED]' // Don't expose the actual secret
});