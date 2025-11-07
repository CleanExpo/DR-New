/**
 * Base Domain Error
 *
 * All domain-specific errors should extend this class.
 * Domain errors represent business rule violations.
 */

export abstract class DomainError extends Error {
  public readonly code: string;
  public readonly timestamp: Date;

  constructor(message: string, code?: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || this.name;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

/**
 * Validation Error
 *
 * Thrown when input data doesn't meet validation rules
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly constraint?: string
  ) {
    super(message, 'VALIDATION_ERROR');
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      field: this.field,
      constraint: this.constraint,
    };
  }
}

/**
 * Business Rule Violation
 *
 * Thrown when an action violates a business rule
 */
export class BusinessRuleViolation extends DomainError {
  constructor(
    message: string,
    public readonly rule: string
  ) {
    super(message, 'BUSINESS_RULE_VIOLATION');
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      rule: this.rule,
    };
  }
}

/**
 * Not Found Error
 *
 * Thrown when an entity is not found
 */
export class NotFoundError extends DomainError {
  constructor(
    message: string,
    public readonly entityType: string,
    public readonly entityId: string
  ) {
    super(message, 'NOT_FOUND');
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      entityType: this.entityType,
      entityId: this.entityId,
    };
  }
}

/**
 * Conflict Error
 *
 * Thrown when an operation conflicts with existing state
 */
export class ConflictError extends DomainError {
  constructor(
    message: string,
    public readonly conflictingId?: string
  ) {
    super(message, 'CONFLICT');
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      conflictingId: this.conflictingId,
    };
  }
}

/**
 * Service Area Error
 *
 * Thrown when a service area is not supported
 */
export class ServiceAreaError extends DomainError {
  constructor(
    public readonly postcode: string,
    public readonly supportedAreas: string[]
  ) {
    super(
      `Service area ${postcode} is not supported. We serve: ${supportedAreas.join(', ')}`,
      'SERVICE_AREA_NOT_SUPPORTED'
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      postcode: this.postcode,
      supportedAreas: this.supportedAreas,
    };
  }
}

/**
 * Emergency Response Error
 *
 * Thrown when emergency response conditions are not met
 */
export class EmergencyResponseError extends DomainError {
  constructor(message: string) {
    super(message, 'EMERGENCY_RESPONSE_ERROR');
  }
}

/**
 * Insurance Claim Error
 *
 * Thrown when insurance claim validation fails
 */
export class InsuranceClaimError extends DomainError {
  constructor(
    message: string,
    public readonly claimId?: string,
    public readonly reason?: string
  ) {
    super(message, 'INSURANCE_CLAIM_ERROR');
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      claimId: this.claimId,
      reason: this.reason,
    };
  }
}
