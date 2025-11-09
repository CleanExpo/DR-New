/**
 * Branded Types for Type Safety
 *
 * Branded types provide compile-time guarantees that prevent mixing
 * semantically different values of the same primitive type.
 */

// Brand symbol for unique type identification
declare const __brand: unique symbol;

/**
 * Brand utility type
 * Creates a branded type by adding a unique symbol property
 */
export type Brand<T, TBrand extends string> = T & {
  readonly [__brand]: TBrand;
};

/**
 * Service-related branded types
 */
export type ServiceId = Brand<string, 'ServiceId'>;
export type ServiceSlug = Brand<string, 'ServiceSlug'>;
export type ServiceCategory = Brand<string, 'ServiceCategory'>;

/**
 * Location-related branded types
 */
export type LocationId = Brand<string, 'LocationId'>;
export type LocationSlug = Brand<string, 'LocationSlug'>;
export type Postcode = Brand<string, 'Postcode'>;
export type Latitude = Brand<number, 'Latitude'>;
export type Longitude = Brand<number, 'Longitude'>;

/**
 * Contact-related branded types
 */
export type PhoneNumber = Brand<string, 'PhoneNumber'>;
export type EmailAddress = Brand<string, 'EmailAddress'>;
export type ABN = Brand<string, 'ABN'>;

/**
 * User-related branded types
 */
export type UserId = Brand<string, 'UserId'>;
export type SessionId = Brand<string, 'SessionId'>;
export type ContractorId = Brand<string, 'ContractorId'>;

/**
 * Content-related branded types
 */
export type PageId = Brand<string, 'PageId'>;
export type TemplateId = Brand<string, 'TemplateId'>;
export type ContentBlockId = Brand<string, 'ContentBlockId'>;

/**
 * Financial branded types
 */
export type Currency = Brand<number, 'Currency'>;
export type Percentage = Brand<number, 'Percentage'>;

/**
 * Time-related branded types
 */
export type Timestamp = Brand<number, 'Timestamp'>;
export type ISO8601String = Brand<string, 'ISO8601String'>;
export type UnixTimestamp = Brand<number, 'UnixTimestamp'>;

/**
 * URL-related branded types
 */
export type URL = Brand<string, 'URL'>;
export type ImageURL = Brand<string, 'ImageURL'>;
export type CanonicalURL = Brand<string, 'CanonicalURL'>;

/**
 * Constructor functions for branded types
 * These provide runtime validation and type branding
 */

export const ServiceId = {
  create: (value: string): ServiceId => {
    if (!value || value.trim().length === 0) {
      throw new Error('ServiceId cannot be empty');
    }
    return value as ServiceId;
  },
  validate: (value: unknown): value is ServiceId => {
    return typeof value === 'string' && value.trim().length > 0;
  }
};

export const LocationId = {
  create: (value: string): LocationId => {
    if (!value || value.trim().length === 0) {
      throw new Error('LocationId cannot be empty');
    }
    return value as LocationId;
  },
  validate: (value: unknown): value is LocationId => {
    return typeof value === 'string' && value.trim().length > 0;
  }
};

export const PhoneNumber = {
  create: (value: string): PhoneNumber => {
    const cleaned = value.replace(/\s+/g, '');
    if (!/^1300\d{6}$|^\+?\d{10,12}$/.test(cleaned)) {
      throw new Error('Invalid phone number format');
    }
    return cleaned as PhoneNumber;
  },
  validate: (value: unknown): value is PhoneNumber => {
    if (typeof value !== 'string') return false;
    const cleaned = value.replace(/\s+/g, '');
    return /^1300\d{6}$|^\+?\d{10,12}$/.test(cleaned);
  }
};

export const EmailAddress = {
  create: (value: string): EmailAddress => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email address format');
    }
    return value.toLowerCase() as EmailAddress;
  },
  validate: (value: unknown): value is EmailAddress => {
    if (typeof value !== 'string') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
};

export const Postcode = {
  create: (value: string): Postcode => {
    if (!/^4\d{3}$/.test(value)) {
      throw new Error('Invalid Queensland postcode');
    }
    return value as Postcode;
  },
  validate: (value: unknown): value is Postcode => {
    return typeof value === 'string' && /^4\d{3}$/.test(value);
  }
};

export const ABN = {
  create: (value: string): ABN => {
    const cleaned = value.replace(/\s+/g, '');
    if (!/^\d{11}$/.test(cleaned)) {
      throw new Error('Invalid ABN format (must be 11 digits)');
    }
    return cleaned as ABN;
  },
  validate: (value: unknown): value is ABN => {
    if (typeof value !== 'string') return false;
    const cleaned = value.replace(/\s+/g, '');
    return /^\d{11}$/.test(cleaned);
  }
};

export const Currency = {
  create: (value: number): Currency => {
    if (value < 0) {
      throw new Error('Currency cannot be negative');
    }
    return value as Currency;
  },
  validate: (value: unknown): value is Currency => {
    return typeof value === 'number' && value >= 0;
  },
  format: (value: Currency): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(value);
  }
};

export const Percentage = {
  create: (value: number): Percentage => {
    if (value < 0 || value > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
    return value as Percentage;
  },
  validate: (value: unknown): value is Percentage => {
    return typeof value === 'number' && value >= 0 && value <= 100;
  },
  format: (value: Percentage): string => {
    return `${value}%`;
  }
};

export const URL = {
  create: (value: string): URL => {
    try {
      new globalThis.URL(value);
      return value as URL;
    } catch {
      throw new Error('Invalid URL format');
    }
  },
  validate: (value: unknown): value is URL => {
    if (typeof value !== 'string') return false;
    try {
      new globalThis.URL(value);
      return true;
    } catch {
      return false;
    }
  }
};

export const ISO8601String = {
  create: (value: string | Date): ISO8601String => {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date.toISOString() as ISO8601String;
  },
  validate: (value: unknown): value is ISO8601String => {
    if (typeof value !== 'string') return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
};

/**
 * Type guard utilities for branded types
 */
export const isBrandedType = {
  serviceId: ServiceId.validate,
  locationId: LocationId.validate,
  phoneNumber: PhoneNumber.validate,
  emailAddress: EmailAddress.validate,
  postcode: Postcode.validate,
  abn: ABN.validate,
  currency: Currency.validate,
  percentage: Percentage.validate,
  url: URL.validate,
  iso8601: ISO8601String.validate,
};

/**
 * Utility type to extract the base type from a branded type
 */
export type Unbrand<T> = T extends Brand<infer U, any> ? U : T;
