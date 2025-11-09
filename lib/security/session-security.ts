import { randomBytes, createHash } from 'crypto';

/**
 * Enhanced Session Security
 * Implements secure session management with theft detection and rotation
 */

export interface SessionData {
  id: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  createdAt: number;
  lastActivity: number;
  fingerprintHash: string;
  requestCount: number;
  rotatedAt?: number;
}

export interface SessionConfig {
  maxAge: number; // Session max age in milliseconds
  idleTimeout: number; // Idle timeout in milliseconds
  rotationInterval: number; // Auto-rotation interval
  fingerprintCheck: boolean; // Enable fingerprint validation
  ipCheck: boolean; // Enable IP validation
  maxRequestsPerMinute: number; // Per-session rate limit
}

const DEFAULT_CONFIG: SessionConfig = {
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  idleTimeout: 30 * 60 * 1000, // 30 minutes
  rotationInterval: 60 * 60 * 1000, // 1 hour
  fingerprintCheck: true,
  ipCheck: false, // Disabled by default (mobile users change IPs)
  maxRequestsPerMinute: 100,
};

class SessionSecurityManager {
  private sessions = new Map<string, SessionData>();
  private config: SessionConfig;

  constructor(config: Partial<SessionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Create a new session
   */
  createSession(
    userId: string | undefined,
    ipAddress: string,
    userAgent: string
  ): { sessionId: string; fingerprint: string } {
    const sessionId = this.generateSessionId();
    const fingerprint = this.generateFingerprint(ipAddress, userAgent);
    const fingerprintHash = this.hashFingerprint(fingerprint);

    const session: SessionData = {
      id: sessionId,
      userId,
      ipAddress,
      userAgent,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      fingerprintHash,
      requestCount: 0,
    };

    this.sessions.set(sessionId, session);

    // Clean up old sessions periodically
    if (Math.random() < 0.01) {
      this.cleanupExpiredSessions();
    }

    return { sessionId, fingerprint };
  }

  /**
   * Validate session and detect theft
   */
  validateSession(
    sessionId: string,
    ipAddress: string,
    userAgent: string,
    fingerprint?: string
  ): {
    valid: boolean;
    reason?: string;
    shouldRotate?: boolean;
    session?: SessionData;
  } {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return { valid: false, reason: 'Session not found' };
    }

    const now = Date.now();

    // Check session age
    if (now - session.createdAt > this.config.maxAge) {
      this.sessions.delete(sessionId);
      return { valid: false, reason: 'Session expired' };
    }

    // Check idle timeout
    if (now - session.lastActivity > this.config.idleTimeout) {
      this.sessions.delete(sessionId);
      return { valid: false, reason: 'Session idle timeout' };
    }

    // Check fingerprint for session theft detection
    if (this.config.fingerprintCheck && fingerprint) {
      const expectedFingerprint = this.generateFingerprint(ipAddress, userAgent);
      const fingerprintHash = this.hashFingerprint(expectedFingerprint);

      if (fingerprintHash !== session.fingerprintHash) {
        this.sessions.delete(sessionId);
        return { valid: false, reason: 'Session theft detected (fingerprint mismatch)' };
      }
    }

    // Check IP address (if enabled)
    if (this.config.ipCheck && session.ipAddress !== ipAddress) {
      // Log but don't invalidate (mobile users change IPs)
      console.warn('[SESSION SECURITY] IP address changed', {
        sessionId,
        oldIP: session.ipAddress,
        newIP: ipAddress,
      });
    }

    // Check if session needs rotation
    const shouldRotate =
      session.rotatedAt
        ? now - session.rotatedAt > this.config.rotationInterval
        : now - session.createdAt > this.config.rotationInterval;

    // Update activity
    session.lastActivity = now;
    session.requestCount++;

    return {
      valid: true,
      shouldRotate,
      session,
    };
  }

  /**
   * Rotate session ID (prevent session fixation)
   */
  rotateSessionId(oldSessionId: string): string | null {
    const session = this.sessions.get(oldSessionId);
    if (!session) {
      return null;
    }

    // Create new session ID
    const newSessionId = this.generateSessionId();

    // Update session
    session.id = newSessionId;
    session.rotatedAt = Date.now();

    // Move to new ID
    this.sessions.delete(oldSessionId);
    this.sessions.set(newSessionId, session);

    return newSessionId;
  }

  /**
   * Destroy session
   */
  destroySession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * Check session rate limit
   */
  checkSessionRateLimit(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return false;
    }

    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;

    // Reset counter if more than a minute has passed
    if (session.lastActivity < oneMinuteAgo) {
      session.requestCount = 0;
    }

    return session.requestCount <= this.config.maxRequestsPerMinute;
  }

  /**
   * Generate cryptographically secure session ID
   */
  private generateSessionId(): string {
    return randomBytes(32).toString('base64url');
  }

  /**
   * Generate browser fingerprint
   */
  private generateFingerprint(ipAddress: string, userAgent: string): string {
    return `${ipAddress}:${userAgent}`;
  }

  /**
   * Hash fingerprint for storage
   */
  private hashFingerprint(fingerprint: string): string {
    return createHash('sha256').update(fingerprint).digest('hex');
  }

  /**
   * Clean up expired sessions
   */
  private cleanupExpiredSessions(): void {
    const now = Date.now();
    const expired: string[] = [];

    for (const [id, session] of this.sessions.entries()) {
      if (
        now - session.createdAt > this.config.maxAge ||
        now - session.lastActivity > this.config.idleTimeout
      ) {
        expired.push(id);
      }
    }

    expired.forEach(id => this.sessions.delete(id));

    if (expired.length > 0) {
      console.log(`[SESSION SECURITY] Cleaned up ${expired.length} expired sessions`);
    }
  }

  /**
   * Get session metrics
   */
  getMetrics() {
    return {
      totalSessions: this.sessions.size,
      activeSessions: Array.from(this.sessions.values()).filter(
        s => Date.now() - s.lastActivity < 5 * 60 * 1000 // Active in last 5 minutes
      ).length,
    };
  }
}

// Singleton instance
export const sessionSecurity = new SessionSecurityManager();
