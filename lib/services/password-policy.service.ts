/**
 * Password Rotation Policy Service
 * Enforces password change requirements and prevents password reuse
 *
 * Policy:
 * - Passwords must be changed every 90 days
 * - Users cannot reuse the last 5 passwords
 * - Passwords must meet minimum requirements (enforced via validation schema)
 */

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export interface PasswordPolicyConfig {
  rotationIntervalDays: number; // How often password must be changed
  passwordHistorySize: number; // Number of old passwords to prevent reuse
}

export const DEFAULT_PASSWORD_POLICY: PasswordPolicyConfig = {
  rotationIntervalDays: 90, // 90-day password rotation
  passwordHistorySize: 5, // Prevent reuse of last 5 passwords
};

/**
 * Check if user password has expired (needs rotation)
 */
export async function isPasswordExpired(
  userId: string,
  config: PasswordPolicyConfig = DEFAULT_PASSWORD_POLICY
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastPasswordChangeAt: true },
    });

    if (!user) return false;

    // If password change date not set, consider it expired (force change)
    if (!user.lastPasswordChangeAt) {
      return true;
    }

    // Check if password is older than rotation interval
    const now = new Date();
    const daysOld =
      (now.getTime() - user.lastPasswordChangeAt.getTime()) / (1000 * 60 * 60 * 24);

    return daysOld >= config.rotationIntervalDays;
  } catch (error) {
    console.error('Error checking password expiration:', error);
    return false;
  }
}

/**
 * Get password expiration status and days remaining
 */
export async function getPasswordExpirationInfo(
  userId: string,
  config: PasswordPolicyConfig = DEFAULT_PASSWORD_POLICY
): Promise<{
  isExpired: boolean;
  daysRemaining: number;
  expiresAt: Date | null;
} | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastPasswordChangeAt: true },
    });

    if (!user) return null;

    if (!user.lastPasswordChangeAt) {
      return {
        isExpired: true,
        daysRemaining: 0,
        expiresAt: null,
      };
    }

    const expiresAt = new Date(
      user.lastPasswordChangeAt.getTime() +
        config.rotationIntervalDays * 24 * 60 * 60 * 1000
    );
    const now = new Date();
    const daysRemaining = Math.max(
      0,
      Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );

    return {
      isExpired: daysRemaining <= 0,
      daysRemaining,
      expiresAt,
    };
  } catch (error) {
    console.error('Error getting password expiration info:', error);
    return null;
  }
}

/**
 * Check if new password matches any historical password (prevent reuse)
 */
export async function isPasswordAlreadyUsed(
  userId: string,
  newPasswordHash: string,
  config: PasswordPolicyConfig = DEFAULT_PASSWORD_POLICY
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHistory: true, password: true },
    });

    if (!user) return false;

    // Check against current password
    if (user.password) {
      const matchesCurrent = await bcrypt.compare(
        newPasswordHash,
        user.password
      );
      if (matchesCurrent) {
        return true;
      }
    }

    // Check against password history
    if (user.passwordHistory && user.passwordHistory.length > 0) {
      for (const oldHash of user.passwordHistory) {
        try {
          const matches = await bcrypt.compare(newPasswordHash, oldHash);
          if (matches) {
            return true;
          }
        } catch (error) {
          console.error('Error comparing password history:', error);
        }
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking password reuse:', error);
    return false;
  }
}

/**
 * Update user password and manage history
 */
export async function updatePasswordWithHistory(
  userId: string,
  newPasswordHash: string,
  config: PasswordPolicyConfig = DEFAULT_PASSWORD_POLICY
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true, passwordHistory: true },
    });

    if (!user) return false;

    // Build new password history
    const history = user.passwordHistory || [];

    // Add current password to history
    if (user.password) {
      history.unshift(user.password);
    }

    // Keep only the last N passwords
    const trimmedHistory = history.slice(0, config.passwordHistorySize);

    // Update user with new password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: newPasswordHash,
        passwordHistory: trimmedHistory,
        lastPasswordChangeAt: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.error('Error updating password with history:', error);
    return false;
  }
}

/**
 * Reset password policy for user (admin action)
 * Clears history and sets new expiration date
 */
export async function resetPasswordPolicy(userId: string): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastPasswordChangeAt: new Date(),
        passwordHistory: [],
      },
    });

    return true;
  } catch (error) {
    console.error('Error resetting password policy:', error);
    return false;
  }
}

/**
 * Get password policy status for user
 */
export async function getPasswordPolicyStatus(
  userId: string,
  config: PasswordPolicyConfig = DEFAULT_PASSWORD_POLICY
): Promise<{
  isExpired: boolean;
  daysRemaining: number;
  lastChangedAt: Date | null;
  requiresChange: boolean;
  expiresAt: Date | null;
} | null> {
  try {
    const expirationInfo = await getPasswordExpirationInfo(userId, config);

    if (!expirationInfo) return null;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastPasswordChangeAt: true },
    });

    return {
      isExpired: expirationInfo.isExpired,
      daysRemaining: expirationInfo.daysRemaining,
      lastChangedAt: user?.lastPasswordChangeAt || null,
      requiresChange: expirationInfo.isExpired || expirationInfo.daysRemaining <= 7, // Warn 7 days before
      expiresAt: expirationInfo.expiresAt,
    };
  } catch (error) {
    console.error('Error getting password policy status:', error);
    return null;
  }
}

/**
 * Get users with expired passwords (for admin notification)
 */
export async function getUsersWithExpiredPasswords(
  config: PasswordPolicyConfig = DEFAULT_PASSWORD_POLICY
): Promise<
  Array<{
    id: string;
    email: string;
    lastPasswordChangeAt: Date | null;
  }>
> {
  try {
    const cutoffDate = new Date(
      Date.now() - config.rotationIntervalDays * 24 * 60 * 60 * 1000
    );

    return await prisma.user.findMany({
      where: {
        OR: [
          { lastPasswordChangeAt: null }, // Never changed
          { lastPasswordChangeAt: { lt: cutoffDate } }, // Expired
        ],
      },
      select: {
        id: true,
        email: true,
        lastPasswordChangeAt: true,
      },
    });
  } catch (error) {
    console.error('Error getting users with expired passwords:', error);
    return [];
  }
}
