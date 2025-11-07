import { ValueObject } from '../shared/ValueObject';
import { Result } from '../shared/Result';
import { ValidationError } from '../errors/DomainError';

export type Currency = 'AUD' | 'USD' | 'NZD';

/**
 * Money Value Object
 *
 * Represents a monetary amount with currency
 * Handles precision and currency operations safely
 */
export class Money extends ValueObject {
  // Store as cents to avoid floating point issues
  private readonly amountInCents: number;
  private readonly currency: Currency;

  private constructor(amountInCents: number, currency: Currency) {
    super();
    this.amountInCents = Math.round(amountInCents);
    this.currency = currency;
  }

  /**
   * Create Money from dollars
   */
  static fromDollars(amount: number, currency: Currency = 'AUD'): Result<Money> {
    if (amount < 0) {
      return Result.fail(
        new ValidationError('Amount cannot be negative', 'amount', 'min')
      );
    }

    if (!isFinite(amount)) {
      return Result.fail(
        new ValidationError('Amount must be finite', 'amount', 'finite')
      );
    }

    const amountInCents = Math.round(amount * 100);
    return Result.ok(new Money(amountInCents, currency));
  }

  /**
   * Create Money from cents
   */
  static fromCents(cents: number, currency: Currency = 'AUD'): Result<Money> {
    if (cents < 0) {
      return Result.fail(
        new ValidationError('Amount cannot be negative', 'amount', 'min')
      );
    }

    if (!Number.isInteger(cents)) {
      return Result.fail(
        new ValidationError('Cents must be an integer', 'amount', 'integer')
      );
    }

    return Result.ok(new Money(cents, currency));
  }

  /**
   * Create zero amount
   */
  static zero(currency: Currency = 'AUD'): Money {
    return new Money(0, currency);
  }

  /**
   * Add two Money values
   */
  add(other: Money): Result<Money> {
    if (this.currency !== other.currency) {
      return Result.fail(
        new ValidationError(
          'Cannot add money with different currencies',
          'currency',
          'mismatch'
        )
      );
    }

    return Result.ok(new Money(this.amountInCents + other.amountInCents, this.currency));
  }

  /**
   * Subtract two Money values
   */
  subtract(other: Money): Result<Money> {
    if (this.currency !== other.currency) {
      return Result.fail(
        new ValidationError(
          'Cannot subtract money with different currencies',
          'currency',
          'mismatch'
        )
      );
    }

    const newAmount = this.amountInCents - other.amountInCents;
    if (newAmount < 0) {
      return Result.fail(
        new ValidationError('Result cannot be negative', 'amount', 'min')
      );
    }

    return Result.ok(new Money(newAmount, this.currency));
  }

  /**
   * Multiply by a number
   */
  multiply(multiplier: number): Result<Money> {
    if (!isFinite(multiplier)) {
      return Result.fail(
        new ValidationError('Multiplier must be finite', 'multiplier', 'finite')
      );
    }

    const newAmount = Math.round(this.amountInCents * multiplier);
    if (newAmount < 0) {
      return Result.fail(
        new ValidationError('Result cannot be negative', 'amount', 'min')
      );
    }

    return Result.ok(new Money(newAmount, this.currency));
  }

  /**
   * Divide by a number
   */
  divide(divisor: number): Result<Money> {
    if (divisor === 0) {
      return Result.fail(
        new ValidationError('Cannot divide by zero', 'divisor', 'zero')
      );
    }

    if (!isFinite(divisor)) {
      return Result.fail(
        new ValidationError('Divisor must be finite', 'divisor', 'finite')
      );
    }

    const newAmount = Math.round(this.amountInCents / divisor);
    return Result.ok(new Money(newAmount, this.currency));
  }

  /**
   * Calculate percentage
   */
  percentage(percent: number): Result<Money> {
    return this.multiply(percent / 100);
  }

  /**
   * Compare with another Money value
   */
  isGreaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountInCents > other.amountInCents;
  }

  /**
   * Compare with another Money value
   */
  isLessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountInCents < other.amountInCents;
  }

  /**
   * Check if zero
   */
  isZero(): boolean {
    return this.amountInCents === 0;
  }

  /**
   * Check if positive
   */
  isPositive(): boolean {
    return this.amountInCents > 0;
  }

  /**
   * Get amount in dollars
   */
  toDollars(): number {
    return this.amountInCents / 100;
  }

  /**
   * Get amount in cents
   */
  toCents(): number {
    return this.amountInCents;
  }

  /**
   * Get currency
   */
  getCurrency(): Currency {
    return this.currency;
  }

  /**
   * Format as currency string
   */
  toString(): string {
    const dollars = this.toDollars();
    return this.formatCurrency(dollars, this.currency);
  }

  /**
   * Format with custom options
   */
  format(options?: { showCurrency?: boolean; decimalPlaces?: number }): string {
    const dollars = this.toDollars();
    const decimalPlaces = options?.decimalPlaces ?? 2;
    const formatted = dollars.toFixed(decimalPlaces);

    if (options?.showCurrency === false) {
      return formatted;
    }

    return this.formatCurrency(dollars, this.currency);
  }

  /**
   * Format currency based on locale
   */
  private formatCurrency(amount: number, currency: Currency): string {
    const locale = currency === 'AUD' ? 'en-AU' : currency === 'NZD' ? 'en-NZ' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Assert same currency
   */
  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(
        `Currency mismatch: ${this.currency} vs ${other.currency}`
      );
    }
  }

  protected getEqualityComponents(): unknown[] {
    return [this.amountInCents, this.currency];
  }
}
