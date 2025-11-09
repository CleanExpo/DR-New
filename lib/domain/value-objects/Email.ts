/**
 * Email Value Object - Domain Layer
 * Immutable value object with validation
 */

export class Email {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }
    return new Email(email.toLowerCase().trim());
  }

  private static isValid(email: string): boolean {
    if (!email || email.trim() === '') {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get value(): string {
    return this._value;
  }

  get domain(): string {
    return this._value.split('@')[1];
  }

  get localPart(): string {
    return this._value.split('@')[0];
  }

  equals(other: Email): boolean {
    if (!other) {
      return false;
    }
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
