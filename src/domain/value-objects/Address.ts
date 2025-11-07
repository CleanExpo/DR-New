import { ValueObject } from '../shared/ValueObject';
import { Result } from '../shared/Result';
import { ValidationError } from '../errors/DomainError';

export interface AddressProps {
  readonly street: string;
  readonly suburb: string;
  readonly city: string;
  readonly state: string;
  readonly postcode: string;
  readonly country: string;
}

/**
 * Address Value Object
 *
 * Represents a physical address in Australia
 * Immutable - create new instance to change address
 */
export class Address extends ValueObject {
  private constructor(private readonly props: AddressProps) {
    super();
  }

  /**
   * Create a new Address
   * Validates Australian address format
   */
  static create(props: Partial<AddressProps>): Result<Address> {
    // Validation
    if (!props.street || props.street.trim().length === 0) {
      return Result.fail(
        new ValidationError('Street is required', 'street', 'required')
      );
    }

    if (!props.suburb || props.suburb.trim().length === 0) {
      return Result.fail(
        new ValidationError('Suburb is required', 'suburb', 'required')
      );
    }

    if (!props.postcode || !this.isValidAustralianPostcode(props.postcode)) {
      return Result.fail(
        new ValidationError(
          'Valid Australian postcode is required',
          'postcode',
          'format'
        )
      );
    }

    const address = new Address({
      street: props.street.trim(),
      suburb: props.suburb.trim(),
      city: props.city?.trim() || this.getCityFromPostcode(props.postcode),
      state: props.state?.trim() || this.getStateFromPostcode(props.postcode),
      postcode: props.postcode.trim(),
      country: 'Australia',
    });

    return Result.ok(address);
  }

  /**
   * Validate Australian postcode (4 digits)
   */
  private static isValidAustralianPostcode(postcode: string): boolean {
    return /^\d{4}$/.test(postcode);
  }

  /**
   * Get city from postcode
   * Brisbane: 4000-4179, 4300-4399
   * Ipswich: 4300-4306
   * Logan: 4114-4133
   */
  private static getCityFromPostcode(postcode: string): string {
    const code = parseInt(postcode, 10);

    if (code >= 4000 && code <= 4179) return 'Brisbane';
    if (code >= 4300 && code <= 4306) return 'Ipswich';
    if (code >= 4114 && code <= 4133) return 'Logan';

    return 'Brisbane'; // Default
  }

  /**
   * Get state from postcode
   */
  private static getStateFromPostcode(postcode: string): string {
    const code = parseInt(postcode, 10);
    if (code >= 4000 && code <= 4999) return 'QLD';
    return 'QLD'; // Default for this service
  }

  /**
   * Check if address is in Brisbane
   */
  isInBrisbane(): boolean {
    const code = parseInt(this.props.postcode, 10);
    return (code >= 4000 && code <= 4179) || this.props.city === 'Brisbane';
  }

  /**
   * Check if address is in Ipswich
   */
  isInIpswich(): boolean {
    const code = parseInt(this.props.postcode, 10);
    return (code >= 4300 && code <= 4306) || this.props.city === 'Ipswich';
  }

  /**
   * Check if address is in Logan
   */
  isInLogan(): boolean {
    const code = parseInt(this.props.postcode, 10);
    return (code >= 4114 && code <= 4133) || this.props.city === 'Logan';
  }

  /**
   * Check if address is in service area
   */
  isInServiceArea(): boolean {
    return this.isInBrisbane() || this.isInIpswich() || this.isInLogan();
  }

  /**
   * Get formatted address string
   */
  toString(): string {
    return `${this.props.street}, ${this.props.suburb}, ${this.props.city} ${this.props.state} ${this.props.postcode}`;
  }

  /**
   * Get single-line address
   */
  toSingleLine(): string {
    return this.toString();
  }

  /**
   * Get multi-line address
   */
  toMultiLine(): string[] {
    return [
      this.props.street,
      this.props.suburb,
      `${this.props.city} ${this.props.state} ${this.props.postcode}`,
      this.props.country,
    ];
  }

  /**
   * Get address for Google Maps
   */
  toGoogleMapsQuery(): string {
    return encodeURIComponent(this.toString());
  }

  // Getters
  get street(): string {
    return this.props.street;
  }

  get suburb(): string {
    return this.props.suburb;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get postcode(): string {
    return this.props.postcode;
  }

  get country(): string {
    return this.props.country;
  }

  protected getEqualityComponents(): unknown[] {
    return [
      this.props.street.toLowerCase(),
      this.props.suburb.toLowerCase(),
      this.props.postcode,
    ];
  }
}
