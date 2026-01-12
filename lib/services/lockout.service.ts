/**
 * Account Lockout Service
 * Implements account lockout after multiple failed login attempts
 * Prevents brute force password attacks
 */

import { prisma } from '@/lib/prisma';

export interface LockoutConfig {
  maxFailedAttempts: number; // Number of failed attempts before lockout
  lockoutDurationMinutes: number; // How long to lock account for
}

// Default configuration: Lock after 5 failed attempts for 30 minutes
export const DEFAULT_LOCKOUT_CONFIG: LockoutConfig = {
  maxFailedAttempts: 5,
  lockoutDurationMinutes: 30,
};

/**
 * Check if user account is currently locked
 */
export async function isAccountLocked(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lockedUntil: true },
    });

    if (!user) return false;
    if (!user.lockedUntil) return false;

    // Check if lock period has expired
    const now = new Date();
    if (now >= user.lockedUntil) {
      // Lock period expired, unlock the account
      await unlockAccount(userId);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking account lock status:', error);
    return false;
  }
}

/**
 * Record a failed login attempt
 * Locks account if max attempts exceeded
 */
export async function recordFailedLoginAttempt(
  userId: string,
  ipAddress: string,
  userAgent: string,
  config: LockoutConfig = DEFAULT_LOCKOUT_CONFIG
): Promise<{ locked: boolean; attemptsRemaining: number }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        failedLoginAttempts: true,
        lockedUntil: true,
        id: true,
      },
    });

    if (!user) {
      return { locked: false, attemptsRemaining: 0 };
    }

    // Check if already locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      return { locked: true, attemptsRemaining: 0 };
    }

    // Increment failed attempts
    const newFailedAttempts = (user.failedLoginAttempts || 0) + 1;
    const now = new Date();
    const lockedUntil =
      newFailedAttempts >= config.maxFailedAttempts
        ? new Date(now.getTime() + config.lockoutDurationMinutes * 60 * 1000)
        : null;

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: newFailedAttempts,
        lockedUntil,
        lastFailedLoginAt: now,
      },
    });

    // Record login attempt
    await recordLoginAttempt(userId, ipAddress, userAgent, false);

    const isLocked = lockedUntil !== null;
    const attemptsRemaining = Math.max(0, config.maxFailedAttempts - newFailedAttempts);

    return { locked: isLocked, attemptsRemaining };
  } catch (error) {
    console.error('Error recording failed login attempt:', error);
    return { locked: false, attemptsRemaining: 0 };
  }
}

/**
 * Record a successful login attempt
 * Resets failed attempts counter
 */
export async function recordSuccessfulLogin(
  userId: string,
  ipAddress: string,
  userAgent: string
): Promise<void> {
  try {
    // Reset failed attempts and unlock if locked
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
      },
    });

    // Record login attempt
    await recordLoginAttempt(userId, ipAddress, userAgent, true);
  } catch (error) {
    console.error('Error recording successful login:', error);
  }
}

/**
 * Unlock a locked account manually (admin action)
 */
export async function unlockAccount(userId: string): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastFailedLoginAt: null,
      },
    });

    return true;
  } catch (error) {
    console.error('Error unlocking account:', error);
    return false;
  }
}

/**
 * Get lockout information for a user
 */
export async function getLockoutInfo(userId: string): Promise<{
  isLocked: boolean;
  failedAttempts: number;
  lockedUntil: Date | null;
  lastFailedAt: Date | null;
  attemptsRemaining: number;
} | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        failedLoginAttempts: true,
        lockedUntil: true,
        lastFailedLoginAt: true,
      },
    });

    if (!user) return null;

    const now = new Date();
    const isLocked = user.lockedUntil ? now < user.lockedUntil : false;

    return {
      isLocked,
      failedAttempts: user.failedLoginAttempts || 0,
      lockedUntil: user.lockedUntil,
      lastFailedAt: user.lastFailedLoginAt,
      attemptsRemaining: Math.max(
        0,
        DEFAULT_LOCKOUT_CONFIG.maxFailedAttempts - (user.failedLoginAttempts || 0)
      ),
    };
  } catch (error) {
    console.error('Error getting lockout info:', error);
    return null;
  }
}

/**
 * Record login attempt in LoginAttempt table
 */
async function recordLoginAttempt(
  userId: string,
  ipAddress: string,
  userAgent: string,
  success: boolean
): Promise<void> {
  try {
    await prisma.loginAttempt.create({
      data: {
        userId,
        ipAddress,
        userAgent,
        success,
      },
    });
  } catch (error) {
    console.error('Error recording login attempt:', error);
  }
}

/**
 * Get recent login attempts for a user (for audit)
 */
export async function getRecentLoginAttempts(
  userId: string,
  limit: number = 10
): Promise<
  Array<{
    id: string;
    ipAddress: string;
    success: boolean;
    attemptedAt: Date;
  }>
> {
  try {
    return await prisma.loginAttempt.findMany({
      where: { userId },
      select: {
        id: true,
        ipAddress: true,
        success: true,
        attemptedAt: true,
      },
      orderBy: { attemptedAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Error getting login attempts:', error);
    return [];
  }
}

/**
 * Get accounts that are currently locked
 * Useful for admin dashboard
 */
export async function getLockedAccounts(limit: number = 50): Promise<
  Array<{
    id: string;
    email: string;
    failedAttempts: number;
    lockedUntil: Date;
    lastFailedAt: Date | null;
  }>
> {
  try {
    const now = new Date();

    return await prisma.user.findMany({
      where: {
        lockedUntil: {
          gt: now, // Still locked
        },
      },
      select: {
        id: true,
        email: true,
        failedLoginAttempts: true,
        lockedUntil: true,
        lastFailedLoginAt: true,
      },
      orderBy: { lockedUntil: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Error getting locked accounts:', error);
    return [];
  }
}
