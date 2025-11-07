/**
 * Domain Layer Exports
 *
 * This file provides a single entry point for importing domain layer components.
 * The domain layer contains pure business logic with no external dependencies.
 */

// Shared base classes
export { Result, isOk, isError } from './shared/Result';
export { Entity, AggregateRoot } from './shared/Entity';
export type { DomainEvent } from './shared/Entity';
export { ValueObject } from './shared/ValueObject';
export type { ValueObjectProps } from './shared/ValueObject';

// Domain errors
export {
  DomainError,
  ValidationError,
  BusinessRuleViolation,
  NotFoundError,
  ConflictError,
  ServiceAreaError,
  EmergencyResponseError,
  InsuranceClaimError,
} from './errors/DomainError';

// Value objects
export { Address } from './value-objects/Address';
export type { AddressProps } from './value-objects/Address';

export { PhoneNumber } from './value-objects/PhoneNumber';
export type { PhoneType } from './value-objects/PhoneNumber';

export { Money } from './value-objects/Money';
export type { Currency } from './value-objects/Money';

// Entities
export { ServiceRequest } from './entities/ServiceRequest';
export type {
  ServiceType,
  ServicePriority,
  ServiceStatus,
  ServiceRequestProps,
  ServiceRequestedEvent,
  ServiceScheduledEvent,
  ServiceStartedEvent,
  ServiceCompletedEvent,
  ServiceCancelledEvent,
} from './entities/ServiceRequest';

// Repository interfaces
export type {
  IServiceRequestRepository,
  PaginationOptions,
  PaginatedResult,
} from './repositories/IServiceRequestRepository';
