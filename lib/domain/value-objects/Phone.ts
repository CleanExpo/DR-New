/**
 * Phone Value Object - Domain Layer
 * Australian phone number with validation
 */

export class Phone {
  private readonly _value: string;
  private readonly _formatted: string;

  private constructor(value: string, formatted: string) {
    this._value = value;
    this._formatted = formatted;
  }

  static create(phone: string): Phone {
    const cleaned = phone.replace(/\D/g, '');

    if (!this.isValid(cleaned)) {
      throw new Error(`Invalid Australian phone number: ${phone}`);
    }

    const formatted = this.format(cleaned);
    return new Phone(cleaned, formatted);
  }

  private static isValid(cleaned: string): boolean {
    // Australian mobile: 04XX XXX XXX (10 digits)
    // Australian landline: 0X XXXX XXXX (10 digits)
    // 1300/1800: 1300 XXX XXX or 1800 XXX XXX (10 digits)
    if (cleaned.length !== 10) {
      return false;
    }

    // Must start with 0, 1300, or 1800
    return cleaned.startsWith('0') || cleaned.startsWith('1300') || cleaned.startsWith('1800');
  }

  private static format(cleaned: string): string {
    if (cleaned.startsWith('04')) {
      // Mobile: 04XX XXX XXX
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else if (cleaned.startsWith('1300') || cleaned.startsWith('1800')) {
      // 1300/1800: 1300 XXX XXX
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else {
      // Landline: 0X XXXX XXXX
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
    }
  }

  get value(): string {
    return this._value;
  }

  get formatted(): string {
    return this._formatted;
  }

  isMobile(): boolean {
    return this._value.startsWith('04');
  }

  isTollFree(): boolean {
    return this._value.startsWith('1300') || this._value.startsWith('1800');
  }

  equals(other: Phone): boolean {
    if (!other) {
      return false;
    }
    return this._value === other._value;
  }

  toString(): string {
    return this._formatted;
  }
}
