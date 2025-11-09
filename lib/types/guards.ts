/**
 * Type Guards and Runtime Type Validation
 *
 * Provides type-safe runtime validation with TypeScript type guards
 */

import type {
  ServiceId,
  LocationId,
  PhoneNumber,
  EmailAddress,
  Postcode,
  Currency,
  Percentage,
  URL,
} from './branded';

/**
 * Primitive type guards
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Complex type guards
 */
export function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

export function isRecordOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is Record<string, T> {
  if (!isObject(value)) return false;
  return Object.values(value).every(guard);
}

/**
 * Assertion functions
 */
export function assertString(value: unknown, message?: string): asserts value is string {
  if (!isString(value)) {
    throw new TypeError(message ?? `Expected string, got ${typeof value}`);
  }
}

export function assertNumber(value: unknown, message?: string): asserts value is number {
  if (!isNumber(value)) {
    throw new TypeError(message ?? `Expected number, got ${typeof value}`);
  }
}

export function assertNonNullable<T>(
  value: T,
  message?: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new TypeError(message ?? 'Value must not be null or undefined');
  }
}

export function assertArray<T = unknown>(
  value: unknown,
  message?: string
): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new TypeError(message ?? `Expected array, got ${typeof value}`);
  }
}

export function assertObject(
  value: unknown,
  message?: string
): asserts value is Record<string, unknown> {
  if (!isObject(value)) {
    throw new TypeError(message ?? `Expected object, got ${typeof value}`);
  }
}

/**
 * Service-specific type guards
 */
export interface ServiceData {
  id: ServiceId;
  name: string;
  slug: string;
  category: string;
  description: string;
  keywords: string[];
}

export function isServiceData(value: unknown): value is ServiceData {
  if (!isObject(value)) return false;

  return (
    isString(value.id) &&
    isString(value.name) &&
    isString(value.slug) &&
    isString(value.category) &&
    isString(value.description) &&
    isArrayOf(value.keywords, isString)
  );
}

export interface LocationData {
  id: LocationId;
  name: string;
  slug: string;
  state: string;
  postcode: Postcode;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export function isLocationData(value: unknown): value is LocationData {
  if (!isObject(value)) return false;

  const hasRequiredFields = (
    isString(value.id) &&
    isString(value.name) &&
    isString(value.slug) &&
    isString(value.state) &&
    isString(value.postcode)
  );

  if (!hasRequiredFields) return false;

  if (value.coordinates !== undefined) {
    if (!isObject(value.coordinates)) return false;
    if (!isNumber(value.coordinates.lat) || !isNumber(value.coordinates.lng)) {
      return false;
    }
  }

  return true;
}

export interface ContactInfo {
  phone: PhoneNumber;
  email: EmailAddress;
  address?: string;
}

export function isContactInfo(value: unknown): value is ContactInfo {
  if (!isObject(value)) return false;

  return (
    isString(value.phone) &&
    isString(value.email) &&
    (value.address === undefined || isString(value.address))
  );
}

/**
 * API response type guards
 */
export interface APISuccess<T> {
  success: true;
  data: T;
  timestamp: number;
}

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: number;
}

export type APIResponse<T> = APISuccess<T> | APIError;

export function isAPISuccess<T>(
  response: APIResponse<T>
): response is APISuccess<T> {
  return response.success === true;
}

export function isAPIError<T>(
  response: APIResponse<T>
): response is APIError {
  return response.success === false;
}

/**
 * Exhaustive type checking
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

/**
 * Type narrowing utilities
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function hasProperty<K extends PropertyKey>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

export function hasOwnProperty<K extends PropertyKey>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Discriminated union helpers
 */
export function isOfType<T extends { type: string }>(
  value: unknown,
  type: T['type']
): value is T {
  return isObject(value) && value.type === type;
}

export function matchType<T extends { type: string }, R>(
  value: T,
  matchers: {
    [K in T['type']]: (val: Extract<T, { type: K }>) => R;
  }
): R {
  const matcher = matchers[value.type as T['type']];
  if (!matcher) {
    throw new Error(`No matcher for type: ${value.type}`);
  }
  return matcher(value as any);
}

/**
 * Validation result types
 */
export type ValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; errors: string[] };

export function isValidationSuccess<T>(
  result: ValidationResult<T>
): result is { valid: true; data: T } {
  return result.valid === true;
}

export function isValidationError<T>(
  result: ValidationResult<T>
): result is { valid: false; errors: string[] } {
  return result.valid === false;
}

/**
 * Safe parsing utilities
 */
export function parseJSON<T = unknown>(
  value: string
): ValidationResult<T> {
  try {
    const data = JSON.parse(value) as T;
    return { valid: true, data };
  } catch (error) {
    return {
      valid: false,
      errors: [isError(error) ? error.message : 'Invalid JSON']
    };
  }
}

export function parseNumber(value: unknown): ValidationResult<number> {
  if (typeof value === 'number') {
    if (isNaN(value)) {
      return { valid: false, errors: ['Value is NaN'] };
    }
    return { valid: true, data: value };
  }

  if (typeof value === 'string') {
    const num = Number(value);
    if (isNaN(num)) {
      return { valid: false, errors: ['Cannot parse to number'] };
    }
    return { valid: true, data: num };
  }

  return { valid: false, errors: ['Value is not a number or string'] };
}
