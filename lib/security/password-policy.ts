import { hashPassword, verifyPassword } from './encryption';
import { securityLogger, SecurityEventType, SecuritySeverity } from './security-logger';

/**
 * Password Policy and Validation
 * Enforces strong password requirements
 */

export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  minSpecialChars?: number;
  minNumbers?: number;
  preventCommonPasswords: boolean;
  preventUserInfoInPassword: boolean;
  passwordHistory?: number; // Number of previous passwords to check
  maxAge?: number; // Days before password expires
}

export interface PasswordStrength {
  score: number; // 0-5
  feedback: string[];
  strength: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
}

// Default password policy
export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  minSpecialChars: 1,
  minNumbers: 1,
  preventCommonPasswords: true,
  preventUserInfoInPassword: true,
  passwordHistory: 5,
  maxAge: 90, // 90 days
};

// Common passwords to reject (subset - in production use a comprehensive list)
const COMMON_PASSWORDS = [
  'password', 'password123', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', '1234567', 'letmein', 'trustno1', 'dragon', 'baseball',
  'iloveyou', 'master', 'sunshine', 'ashley', 'bailey', 'passw0rd',
  'shadow', '123123', '654321', 'superman', 'qazwsx', 'michael',
  'football', 'welcome', 'jesus', 'ninja', 'mustang', 'password1',
  'welcome123', 'admin', 'admin123', 'root', 'toor', 'test', 'test123',
];

// Special characters
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Validate password against policy
 */
export function validatePassword(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY,
  userInfo?: { email?: string; name?: string; username?: string }
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 1. Check length
  if (password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters long`);
  }

  if (password.length > policy.maxLength) {
    errors.push(`Password must not exceed ${policy.maxLength} characters`);
  }

  // 2. Check character requirements
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (policy.requireNumbers) {
    const numberCount = (password.match(/\d/g) || []).length;
    const minNumbers = policy.minNumbers || 1;
    if (numberCount < minNumbers) {
      errors.push(`Password must contain at least ${minNumbers} number(s)`);
    }
  }

  if (policy.requireSpecialChars) {
    const specialCharRegex = new RegExp(`[${SPECIAL_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`, 'g');
    const specialCount = (password.match(specialCharRegex) || []).length;
    const minSpecial = policy.minSpecialChars || 1;
    if (specialCount < minSpecial) {
      errors.push(`Password must contain at least ${minSpecial} special character(s)`);
    }
  }

  // 3. Check for common passwords
  if (policy.preventCommonPasswords) {
    const lowerPassword = password.toLowerCase();
    if (COMMON_PASSWORDS.some(common => lowerPassword === common || lowerPassword.includes(common))) {
      errors.push('Password is too common. Please choose a more unique password');
    }
  }

  // 4. Check for user information in password
  if (policy.preventUserInfoInPassword && userInfo) {
    const lowerPassword = password.toLowerCase();
    const userFields = [userInfo.email, userInfo.name, userInfo.username]
      .filter(Boolean)
      .map(field => field!.toLowerCase());

    for (const field of userFields) {
      // Check if password contains user info (at least 3 characters)
      if (field.length >= 3 && lowerPassword.includes(field)) {
        errors.push('Password should not contain your personal information');
        break;
      }
    }
  }

  // 5. Check for sequential characters
  if (hasSequentialCharacters(password)) {
    errors.push('Password should not contain sequential characters (e.g., abc, 123)');
  }

  // 6. Check for repeated characters
  if (hasRepeatedCharacters(password, 3)) {
    errors.push('Password should not contain repeated characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate password strength
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length scoring
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
    feedback.push('Good: Mixed case letters');
  }

  if (/\d/.test(password)) {
    score++;
    feedback.push('Good: Contains numbers');
  }

  const specialCharRegex = new RegExp(`[${SPECIAL_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
  if (specialCharRegex.test(password)) {
    score++;
    feedback.push('Good: Contains special characters');
  }

  // Entropy check
  const uniqueChars = new Set(password).size;
  if (uniqueChars / password.length > 0.7) {
    score++;
    feedback.push('Good: High character variety');
  }

  // Deductions
  if (hasSequentialCharacters(password)) {
    score = Math.max(0, score - 1);
    feedback.push('Weak: Contains sequential characters');
  }

  if (hasRepeatedCharacters(password, 3)) {
    score = Math.max(0, score - 1);
    feedback.push('Weak: Contains repeated characters');
  }

  const lowerPassword = password.toLowerCase();
  if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
    score = Math.max(0, score - 2);
    feedback.push('Weak: Contains common password patterns');
  }

  // Determine strength
  const strengths: PasswordStrength['strength'][] = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Very Strong',
  ];

  return {
    score: Math.min(5, score),
    feedback,
    strength: strengths[Math.min(5, score)],
  };
}

/**
 * Check for sequential characters
 */
function hasSequentialCharacters(password: string): boolean {
  const sequences = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
  ];

  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 2; i++) {
      const substring = seq.substring(i, i + 3);
      if (password.includes(substring) || password.includes(substring.split('').reverse().join(''))) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check for repeated characters
 */
function hasRepeatedCharacters(password: string, minRepeats: number): boolean {
  const regex = new RegExp(`(.)\\1{${minRepeats - 1},}`, 'i');
  return regex.test(password);
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(length = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const all = uppercase + lowercase + numbers + special;

  // Ensure at least one of each type
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Hash password with secure algorithm
 */
export async function hashPasswordSecure(password: string): Promise<string> {
  return hashPassword(password);
}

/**
 * Verify password against hash
 */
export async function verifyPasswordSecure(
  password: string,
  hash: string,
  userId?: string,
  ipAddress?: string
): Promise<boolean> {
  const isValid = await verifyPassword(password, hash);

  // Log failed attempts
  if (!isValid) {
    securityLogger.log({
      type: SecurityEventType.LOGIN_FAILED,
      severity: SecuritySeverity.MEDIUM,
      userId,
      ipAddress: ipAddress || 'unknown',
      success: false,
      details: { reason: 'Invalid password' },
    });
  }

  return isValid;
}

/**
 * Check if password has been compromised (Have I Been Pwned API)
 */
export async function checkPasswordCompromised(password: string): Promise<{
  compromised: boolean;
  occurrences?: number;
}> {
  try {
    // Hash the password using SHA-1 (as required by HIBP API)
    const crypto = require('crypto');
    const sha1Hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();

    // Use k-anonymity: send only first 5 chars of hash
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.substring(5);

    // Query HIBP API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'DisasterRecovery-PasswordCheck',
      },
    });

    if (!response.ok) {
      // If API fails, don't block the user
      return { compromised: false };
    }

    const text = await response.text();
    const hashes = text.split('\n');

    // Check if our hash suffix is in the results
    for (const line of hashes) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return {
          compromised: true,
          occurrences: parseInt(count, 10),
        };
      }
    }

    return { compromised: false };
  } catch (error) {
    // If check fails, don't block the user
    return { compromised: false };
  }
}

/**
 * Validate password change
 */
export async function validatePasswordChange(
  userId: string,
  newPassword: string,
  previousPasswords: string[], // Array of previous password hashes
  userInfo?: { email?: string; name?: string; username?: string }
): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];

  // 1. Validate against policy
  const policyValidation = validatePassword(newPassword, DEFAULT_PASSWORD_POLICY, userInfo);
  if (!policyValidation.valid) {
    errors.push(...policyValidation.errors);
  }

  // 2. Check password history
  for (const prevHash of previousPasswords) {
    const matches = await verifyPassword(newPassword, prevHash);
    if (matches) {
      errors.push('Password has been used recently. Please choose a different password');
      break;
    }
  }

  // 3. Check if password is compromised
  const compromisedCheck = await checkPasswordCompromised(newPassword);
  if (compromisedCheck.compromised) {
    errors.push(
      `This password has been exposed in ${compromisedCheck.occurrences} data breaches. Please choose a different password`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}