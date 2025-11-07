import { createCipheriv, createDecipheriv, randomBytes, scrypt, createHash } from 'crypto';
import { promisify } from 'util';

/**
 * Encryption and Cryptographic Functions
 * Provides secure encryption, hashing, and key derivation
 */

const scryptAsync = promisify(scrypt);

// Algorithm configurations
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const SALT_LENGTH = 32;
const AUTH_TAG_LENGTH = 16;
const ITERATIONS = 100000;

/**
 * Generate a cryptographically secure random string
 */
export function generateSecureToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate a random salt
 */
export function generateSalt(length = SALT_LENGTH): Buffer {
  return randomBytes(length);
}

/**
 * Hash a password using scrypt (recommended for password hashing)
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt();
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  // Store salt and hash together
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const [saltHex, keyHex] = hash.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const originalKey = Buffer.from(keyHex, 'hex');

    const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

    // Constant time comparison
    return timingSafeEqual(originalKey, derivedKey);
  } catch (error) {
    return false;
  }
}

/**
 * Timing-safe equality check
 */
function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }

  return result === 0;
}

/**
 * Derive an encryption key from a password
 */
export async function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
}

/**
 * Encrypt data using AES-256-GCM
 */
export async function encrypt(
  plaintext: string,
  masterKey: string
): Promise<string> {
  // Generate random IV
  const iv = randomBytes(IV_LENGTH);

  // Generate salt for key derivation
  const salt = generateSalt();

  // Derive encryption key
  const key = await deriveKey(masterKey, salt);

  // Create cipher
  const cipher = createCipheriv(ALGORITHM, key, iv);

  // Encrypt
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Get authentication tag
  const authTag = cipher.getAuthTag();

  // Combine salt, iv, authTag, and encrypted data
  const combined = Buffer.concat([
    salt,
    iv,
    authTag,
    Buffer.from(encrypted, 'hex'),
  ]);

  return combined.toString('base64');
}

/**
 * Decrypt data using AES-256-GCM
 */
export async function decrypt(
  encryptedData: string,
  masterKey: string
): Promise<string> {
  // Decode from base64
  const combined = Buffer.from(encryptedData, 'base64');

  // Extract components
  const salt = combined.subarray(0, SALT_LENGTH);
  const iv = combined.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const authTag = combined.subarray(
    SALT_LENGTH + IV_LENGTH,
    SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH
  );
  const encrypted = combined.subarray(SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH);

  // Derive decryption key
  const key = await deriveKey(masterKey, salt);

  // Create decipher
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  // Decrypt
  let decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Hash data using SHA-256
 */
export function hash(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Hash data using SHA-512
 */
export function hashSHA512(data: string): string {
  return createHash('sha512').update(data).digest('hex');
}

/**
 * Generate HMAC for data integrity
 */
export function generateHMAC(data: string, secret: string): string {
  return createHash('sha256').update(data + secret).digest('hex');
}

/**
 * Verify HMAC
 */
export function verifyHMAC(data: string, secret: string, hmac: string): boolean {
  const expectedHMAC = generateHMAC(data, secret);
  return timingSafeEqual(Buffer.from(expectedHMAC), Buffer.from(hmac));
}

/**
 * Encrypt sensitive data for storage
 */
export async function encryptForStorage(
  data: any,
  encryptionKey: string
): Promise<string> {
  const jsonString = JSON.stringify(data);
  return encrypt(jsonString, encryptionKey);
}

/**
 * Decrypt sensitive data from storage
 */
export async function decryptFromStorage(
  encryptedData: string,
  encryptionKey: string
): Promise<any> {
  const jsonString = await decrypt(encryptedData, encryptionKey);
  return JSON.parse(jsonString);
}

/**
 * Generate a secure API key
 */
export function generateAPIKey(): string {
  const prefix = 'dr_'; // Disaster Recovery prefix
  const key = generateSecureToken(32);
  return `${prefix}${key}`;
}

/**
 * Hash API key for storage
 */
export function hashAPIKey(apiKey: string): string {
  return hashSHA512(apiKey);
}

/**
 * Generate a secure session ID
 */
export function generateSessionId(): string {
  return generateSecureToken(32);
}

/**
 * Encrypt PII (Personally Identifiable Information)
 */
export class PIIEncryption {
  private masterKey: string;

  constructor(masterKey?: string) {
    this.masterKey = masterKey || process.env.PII_ENCRYPTION_KEY || '';
    if (!this.masterKey) {
      throw new Error('PII encryption key not configured');
    }
  }

  async encryptPII(data: Record<string, any>): Promise<Record<string, string>> {
    const encrypted: Record<string, string> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'string') {
        encrypted[key] = await encrypt(value, this.masterKey);
      }
    }

    return encrypted;
  }

  async decryptPII(data: Record<string, string>): Promise<Record<string, any>> {
    const decrypted: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value) {
        try {
          decrypted[key] = await decrypt(value, this.masterKey);
        } catch (error) {
          // If decryption fails, return null or handle appropriately
          decrypted[key] = null;
        }
      }
    }

    return decrypted;
  }

  async encryptField(value: string): Promise<string> {
    return encrypt(value, this.masterKey);
  }

  async decryptField(encryptedValue: string): Promise<string> {
    return decrypt(encryptedValue, this.masterKey);
  }
}

/**
 * Redact sensitive information from logs
 */
export function redactSensitiveData(data: any): any {
  const sensitiveFields = [
    'password',
    'token',
    'apiKey',
    'secret',
    'creditCard',
    'ssn',
    'taxId',
    'bankAccount',
  ];

  if (typeof data === 'string') {
    // Redact email addresses
    let redacted = data.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
    // Redact phone numbers
    redacted = redacted.replace(/(\+61|0)[2-478]([0-9]{8})/g, '[PHONE]');
    return redacted;
  }

  if (Array.isArray(data)) {
    return data.map(item => redactSensitiveData(item));
  }

  if (data && typeof data === 'object') {
    const redacted: any = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveFields.some(field => lowerKey.includes(field));

      if (isSensitive) {
        redacted[key] = '[REDACTED]';
      } else {
        redacted[key] = redactSensitiveData(value);
      }
    }
    return redacted;
  }

  return data;
}

/**
 * Mask sensitive data for display
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;

  const maskedLocal = local.length > 2
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : local;

  return `${maskedLocal}@${domain}`;
}

export function maskPhone(phone: string): string {
  // Show only last 4 digits
  if (phone.length <= 4) return phone;
  return '*'.repeat(phone.length - 4) + phone.slice(-4);
}

export function maskCreditCard(cardNumber: string): string {
  // Show only last 4 digits
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length <= 4) return cleaned;
  return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
}