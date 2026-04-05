// @ts-nocheck
/**
 * Two-Factor Authentication (2FA) Service
 *
 * Implements TOTP (Time-based One-Time Password) authentication
 * with backup code support for account recovery
 *
 * Features:
 * - TOTP secret generation (RFC 6238)
 * - QR code generation for authenticator apps
 * - TOTP code verification with time window tolerance
 * - Backup code generation and verification
 * - Secure code storage with hashing
 *
 * Supported apps: Google Authenticator, Microsoft Authenticator, Authy, etc.
 *
 * Usage:
 * ```ts
 * import { twoFactorService } from '@/lib/auth/two-factor';
 *
 * // Generate secret for new 2FA setup
 * const { secret, qrCode } = await twoFactorService.generateSecret(
 *   userId,
 *   userEmail,
 *   'NRPG'
 * );
 *
 * // Verify user's TOTP code
 * const isValid = twoFactorService.verifyTOTP(secret, userCode);
 *
 * // Generate backup codes
 * const backupCodes = twoFactorService.generateBackupCodes();
 * ```
 */

import * as OTPLib from 'otplib';
import { toDataURL } from 'qrcode';
import { createHash, randomBytes } from 'crypto';
import { logError, logInfo, logWarn } from '@/lib/logger/helpers';

const { authenticator } = OTPLib;

export interface TOTPSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  manualEntryKey: string;
}

export interface TOTPVerification {
  valid: boolean;
  remainingAttempts?: number;
}

class TwoFactorService {
  private readonly appName = 'NRPG';
  private readonly window = 1; // Allow ±1 time window (30 second validity)
  private readonly codeLength = 6;
  private readonly backupCodeLength = 12;
  private readonly backupCodesCount = 10;

  /**
   * Generate TOTP secret and QR code for new 2FA setup
   */
  async generateSecret(
    userId: string,
    userEmail: string,
    issuer: string = this.appName
  ): Promise<TOTPSetup> {
    try {
      // Generate random secret
      const secret = authenticator.generateSecret({
        name: `${issuer} (${userEmail})`,
        issuer,
        length: 32,
      });

      // Generate QR code
      const otpauthUrl = authenticator.keyuri(userEmail, issuer, secret);
      const qrCode = await toDataURL(otpauthUrl);

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      logInfo('2FA setup generated', {
        userId,
        appName: issuer,
        backupCodesCount: backupCodes.length,
      });

      return {
        secret,
        qrCode,
        backupCodes,
        manualEntryKey: secret, // For manual entry if QR scanning fails
      };
    } catch (error) {
      logError(error, { context: 'totp_secret_generation', userId });
      throw new Error('Failed to generate 2FA secret');
    }
  }

  /**
   * Verify TOTP code
   */
  verifyTOTP(secret: string, token: string): boolean {
    try {
      // Verify the token is 6 digits
      if (!/^\d{6}$/.test(token)) {
        logWarn('Invalid TOTP code format', { tokenLength: token.length });
        return false;
      }

      // Use otplib to verify with time window
      const isValid = authenticator.check(token, secret);

      return isValid;
    } catch (error) {
      logError(error, { context: 'totp_verification' });
      return false;
    }
  }

  /**
   * Generate backup codes for account recovery
   */
  generateBackupCodes(count: number = this.backupCodesCount): string[] {
    try {
      const codes: string[] = [];

      for (let i = 0; i < count; i++) {
        // Generate random bytes and convert to readable format
        const randomBytes_ = randomBytes(6).toString('hex').toUpperCase();
        // Format as XXXX-XXXX for readability
        const code = `${randomBytes_.substring(0, 4)}-${randomBytes_.substring(4, 8)}-${randomBytes_.substring(8, 12)}`;
        codes.push(code);
      }

      return codes;
    } catch (error) {
      logError(error, { context: 'backup_codes_generation' });
      throw new Error('Failed to generate backup codes');
    }
  }

  /**
   * Hash backup code for secure storage
   */
  hashBackupCode(code: string): string {
    try {
      // Normalize code: remove hyphens and convert to lowercase
      const normalized = code.replace(/-/g, '').toUpperCase();

      // Hash with SHA256
      return createHash('sha256').update(normalized).digest('hex');
    } catch (error) {
      logError(error, { context: 'backup_code_hashing' });
      throw new Error('Failed to hash backup code');
    }
  }

  /**
   * Verify backup code against hash
   */
  verifyBackupCode(code: string, hashedCode: string): boolean {
    try {
      const normalized = code.replace(/-/g, '').toUpperCase();
      const computed = createHash('sha256').update(normalized).digest('hex');

      // Timing-safe comparison
      return this.timingSafeCompare(computed, hashedCode);
    } catch (error) {
      logError(error, { context: 'backup_code_verification' });
      return false;
    }
  }

  /**
   * Timing-safe string comparison
   */
  private timingSafeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Get current TOTP code (for testing only)
   */
  getCurrentTOTP(secret: string): string {
    try {
      return authenticator.generate(secret);
    } catch (error) {
      logError(error, { context: 'totp_generation' });
      throw new Error('Failed to generate current TOTP');
    }
  }

  /**
   * Format backup codes for display
   */
  formatBackupCodes(codes: string[]): string {
    return codes.join('\n');
  }

  /**
   * Parse backup codes from user input
   */
  parseBackupCodes(input: string): string[] {
    return input
      .split(/[\n,;]/)
      .map((code) => code.trim().toUpperCase())
      .filter((code) => code.length > 0);
  }

  /**
   * Generate QR code data URL
   */
  async generateQRCode(userEmail: string, secret: string, issuer: string = this.appName): Promise<string> {
    try {
      const otpauthUrl = authenticator.keyuri(userEmail, issuer, secret);
      return await toDataURL(otpauthUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.95,
        margin: 1,
        width: 300,
      });
    } catch (error) {
      logError(error, { context: 'qrcode_generation', userEmail });
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Get 2FA service status
   */
  getStatus(): {
    totpWindow: number;
    codeLength: number;
    backupCodeLength: number;
    backupCodesCount: number;
  } {
    return {
      totpWindow: this.window,
      codeLength: this.codeLength,
      backupCodeLength: this.backupCodeLength,
      backupCodesCount: this.backupCodesCount,
    };
  }
}

/**
 * Export singleton instance
 */
export const twoFactorService = new TwoFactorService();

/**
 * Export class for testing
 */
export { TwoFactorService };
