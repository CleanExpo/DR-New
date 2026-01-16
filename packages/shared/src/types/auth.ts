/**
 * Shared authentication types between Next.js and Python backend
 */

export type UserType = 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN';

export interface JWTPayload {
  /** User ID (CUID) */
  id: string;
  /** Also stored as sub for JWT compliance */
  sub?: string;
  /** User email */
  email?: string;
  /** User display name */
  name?: string;
  /** User type/role */
  userType?: UserType;
  /** Legacy role field */
  role?: string;
  /** Profile image URL */
  image?: string;
  /** Tenant ID for multi-tenancy */
  tenantId?: string;
  /** Issued at timestamp */
  iat?: number;
  /** Expiration timestamp */
  exp?: number;
  /** JWT ID */
  jti?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  userType: UserType;
  image?: string | null;
  tenantId?: string | null;
}

export interface SessionUser extends AuthUser {
  role: string;
}

/**
 * Token types for different authentication flows
 */
export type TokenType = 'auth' | 'password-reset' | 'email-verification' | '2fa';

/**
 * API Key validation result
 */
export interface ApiKeyValidation {
  valid: boolean;
  userId?: string;
  scopes?: string[];
  expiresAt?: Date;
}
