import { ValueObject } from '../shared/ValueObject';
import { Result } from '../shared/Result';
import { ValidationError } from '../errors/DomainError';

export type PhoneType = 'mobile' | 'landline' | 'emergency';

/**
 * PhoneNumber Value Object
 *
 * Represents an Australian phone number
 * Validates and formats Australian phone numbers
 */
export class PhoneNumber extends ValueObject {
  private constructor(
    private readonly number: string,
    private readonly type: PhoneType
  ) {
    super();
  }

  /**
   * Create a new PhoneNumber
   * Validates and formats Australian phone numbers
   */
  static create(phoneNumber: string, type?: PhoneType): Result<PhoneNumber> {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Remove leading '0' or '+61'
    let normalized = cleaned;
    if (normalized.startsWith('61')) {
      normalized = normalized.substring(2);
    } else if (normalized.startsWith('0')) {
      normalized = normalized.substring(1);
    }

    // Validate length (Australian numbers are 9 digits without country code)
    if (normalized.length !== 9) {
      return Result.fail(
        new ValidationError(
          'Invalid Australian phone number format',
          'phone',
          'format'
        )
      );
    }

    // Determine phone type if not provided
    const phoneType = type || this.detectPhoneType(normalized);

    // Format number
    const formatted = this.formatNumber(normalized, phoneType);

    return Result.ok(new PhoneNumber(formatted, phoneType));
  }

  /**
   * Detect phone type from number
   */
  private static detectPhoneType(number: string): PhoneType {
    // Mobile: starts with 4
    if (number.startsWith('4')) return 'mobile';

    // Emergency: 000, 131444 (SES), etc.
    if (number.startsWith('000') || number.startsWith('131')) return 'emergency';

    // Default to landline
    return 'landline';
  }

  /**
   * Format number for display
   */
  private static formatNumber(number: string, type: PhoneType): string {
    if (type === 'mobile') {
      // Format: 04XX XXX XXX
      return `04${number.substring(1, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    } else if (type === 'landline') {
      // Format: 07 XXXX XXXX (Brisbane area code)
      return `0${number.substring(0, 1)} ${number.substring(1, 5)} ${number.substring(5)}`;
    }
    return number;
  }

  /**
   * Get number in E.164 format (+61XXXXXXXXX)
   */
  toE164(): string {
    const cleaned = this.number.replace(/\D/g, '');
    return `+61${cleaned.substring(1)}`;
  }

  /**
   * Get number for tel: link
   */
  toTelLink(): string {
    return `tel:${this.toE164()}`;
  }

  /**
   * Get number in national format (0X XXXX XXXX)
   */
  toNational(): string {
    return this.number;
  }

  /**
   * Get number for SMS link
   */
  toSmsLink(): string {
    return `sms:${this.toE164()}`;
  }

  /**
   * Check if this is a mobile number
   */
  isMobile(): boolean {
    return this.type === 'mobile';
  }

  /**
   * Check if this is a landline
   */
  isLandline(): boolean {
    return this.type === 'landline';
  }

  /**
   * Check if this is an emergency number
   */
  isEmergency(): boolean {
    return this.type === 'emergency';
  }

  /**
   * Get formatted number for display
   */
  toString(): string {
    return this.number;
  }

  protected getEqualityComponents(): unknown[] {
    const cleaned = this.number.replace(/\D/g, '');
    return [cleaned];
  }
}
