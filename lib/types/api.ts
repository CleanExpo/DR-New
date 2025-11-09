/**
 * API Type Definitions with Advanced TypeScript Patterns
 *
 * Provides type-safe API client types with discriminated unions
 * and conditional types for request/response handling
 */

import type { ServiceId, LocationId, PhoneNumber, EmailAddress } from './branded';
import type { DeepReadonly, Nullable } from './utils';

/**
 * HTTP Methods
 */
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API Response Status
 */
export type APIStatus = 'success' | 'error' | 'pending';

/**
 * Base API Response (Discriminated Union)
 */
export type APIResponse<T> =
  | APISuccessResponse<T>
  | APIErrorResponse
  | APIPendingResponse;

export interface APISuccessResponse<T> {
  status: 'success';
  data: T;
  metadata?: {
    timestamp: number;
    requestId: string;
    version: string;
  };
}

export interface APIErrorResponse {
  status: 'error';
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
    stack?: string;
  };
  metadata?: {
    timestamp: number;
    requestId: string;
  };
}

export interface APIPendingResponse {
  status: 'pending';
  progress?: number;
  message?: string;
}

/**
 * Error Codes (Discriminated Union)
 */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Pagination Parameters
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter Parameters (Generic)
 */
export type FilterParams<T> = {
  [K in keyof T]?: T[K] | T[K][];
};

/**
 * Search Parameters
 */
export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, unknown>;
  fields?: string[];
}

/**
 * Request Configuration
 */
export interface RequestConfig {
  method: HTTPMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  retries?: number;
  cache?: 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
}

/**
 * Service API Types
 */
export interface ServiceRequest {
  serviceId: ServiceId;
  locationId?: LocationId;
  urgent?: boolean;
  description?: string;
}

export interface ServiceResponse {
  id: ServiceId;
  name: string;
  slug: string;
  category: string;
  description: string;
  available: boolean;
  responseTime?: number;
  pricing?: {
    min: number;
    max: number;
    unit: 'hour' | 'sqm' | 'project';
  };
}

/**
 * Emergency Request Types
 */
export interface EmergencyRequest {
  type: 'water' | 'fire' | 'storm' | 'mould' | 'biohazard';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    address: string;
    suburb: string;
    postcode: string;
  };
  contact: {
    name: string;
    phone: PhoneNumber;
    email?: EmailAddress;
  };
  description: string;
  images?: string[];
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    claimNumber?: string;
  };
}

export interface EmergencyResponse {
  requestId: string;
  status: 'received' | 'dispatched' | 'en-route' | 'on-site' | 'completed';
  estimatedArrival?: number; // minutes
  assignedTechnician?: {
    name: string;
    phone: PhoneNumber;
    vehicleDetails?: string;
  };
  timeline?: {
    received: string;
    dispatched?: string;
    arrived?: string;
    completed?: string;
  };
}

/**
 * Quote Request Types
 */
export interface QuoteRequest {
  serviceId: ServiceId;
  locationId: LocationId;
  propertyType: 'residential' | 'commercial' | 'industrial';
  urgency: 'standard' | 'urgent' | 'emergency';
  description: string;
  affectedArea?: number; // square meters
  images?: string[];
  contact: {
    name: string;
    phone: PhoneNumber;
    email: EmailAddress;
  };
  preferredContactMethod: 'phone' | 'email' | 'sms';
  insuranceClaim: boolean;
}

export interface QuoteResponse {
  quoteId: string;
  status: 'pending' | 'ready' | 'approved' | 'declined';
  estimate?: {
    low: number;
    high: number;
    currency: 'AUD';
    breakdown?: {
      labor: number;
      materials: number;
      equipment: number;
      disposal: number;
    };
  };
  validUntil?: string;
  terms?: string[];
}

/**
 * Conditional Request/Response Types
 */
export type RequestByMethod<M extends HTTPMethod, T> = M extends 'GET'
  ? { params?: T }
  : M extends 'POST' | 'PUT' | 'PATCH'
  ? { body: T }
  : M extends 'DELETE'
  ? { params?: { id: string } }
  : never;

export type ResponseByStatus<S extends APIStatus, T> = S extends 'success'
  ? APISuccessResponse<T>
  : S extends 'error'
  ? APIErrorResponse
  : APIPendingResponse;

/**
 * Endpoint Configuration (Mapped Types)
 */
export type EndpointConfig<T extends Record<string, any>> = {
  [K in keyof T]: {
    method: HTTPMethod;
    path: string;
    requestType: unknown;
    responseType: unknown;
  };
};

/**
 * Type-safe API Client
 */
export interface TypedAPIClient<Endpoints extends EndpointConfig<any>> {
  request<K extends keyof Endpoints>(
    endpoint: K,
    config: RequestByMethod<
      Endpoints[K]['method'],
      Endpoints[K]['requestType']
    > &
      Omit<RequestConfig, 'method'>
  ): Promise<APIResponse<Endpoints[K]['responseType']>>;
}

/**
 * Webhook Event Types (Discriminated Union)
 */
export type WebhookEvent =
  | EmergencyCreatedEvent
  | EmergencyUpdatedEvent
  | QuoteReadyEvent
  | JobCompletedEvent;

export interface BaseWebhookEvent {
  id: string;
  timestamp: number;
  version: string;
}

export interface EmergencyCreatedEvent extends BaseWebhookEvent {
  type: 'emergency.created';
  data: EmergencyRequest;
}

export interface EmergencyUpdatedEvent extends BaseWebhookEvent {
  type: 'emergency.updated';
  data: {
    requestId: string;
    status: EmergencyResponse['status'];
    updates: Partial<EmergencyResponse>;
  };
}

export interface QuoteReadyEvent extends BaseWebhookEvent {
  type: 'quote.ready';
  data: QuoteResponse;
}

export interface JobCompletedEvent extends BaseWebhookEvent {
  type: 'job.completed';
  data: {
    jobId: string;
    completedAt: string;
    summary: string;
    images?: string[];
  };
}

/**
 * Retry Policy
 */
export interface RetryPolicy {
  maxRetries: number;
  backoffMultiplier: number;
  initialDelay: number;
  maxDelay: number;
  retryableErrors: ErrorCode[];
}

/**
 * API Client State (Discriminated Union)
 */
export type APIClientState =
  | { state: 'idle' }
  | { state: 'loading'; progress?: number }
  | { state: 'success'; lastUpdated: number }
  | { state: 'error'; error: APIErrorResponse };

/**
 * Generic Repository Pattern Types
 */
export interface Repository<T, ID = string> {
  findById(id: ID): Promise<Nullable<T>>;
  findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
  search(params: SearchParams): Promise<PaginatedResponse<T>>;
}

/**
 * Query Builder Types
 */
export interface QueryBuilder<T> {
  where(field: keyof T, operator: ComparisonOperator, value: any): this;
  whereIn(field: keyof T, values: any[]): this;
  orderBy(field: keyof T, direction: 'asc' | 'desc'): this;
  limit(count: number): this;
  offset(count: number): this;
  select(...fields: (keyof T)[]): this;
  execute(): Promise<T[]>;
  first(): Promise<Nullable<T>>;
  count(): Promise<number>;
}

export type ComparisonOperator =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'LIKE'
  | 'IN'
  | 'NOT IN';

/**
 * Batch Operations
 */
export interface BatchRequest<T> {
  operations: Array<
    | { type: 'create'; data: Omit<T, 'id'> }
    | { type: 'update'; id: string; data: Partial<T> }
    | { type: 'delete'; id: string }
  >;
}

export interface BatchResponse<T> {
  results: Array<
    | { success: true; data: T }
    | { success: false; error: string }
  >;
  summary: {
    total: number;
    succeeded: number;
    failed: number;
  };
}

/**
 * Cache Strategy
 */
export interface CacheStrategy {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate?: number;
  tags?: string[];
  invalidateOn?: string[]; // Event names that invalidate cache
}

/**
 * Rate Limiting
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  retryAfter?: number; // Seconds until retry allowed
}

/**
 * API Metadata
 */
export interface APIMetadata {
  requestId: string;
  timestamp: number;
  version: string;
  rateLimit?: RateLimitInfo;
  deprecationNotice?: {
    message: string;
    sunsetDate?: string;
    migrationGuide?: string;
  };
}

/**
 * Type-safe fetch wrapper
 */
export async function typedFetch<T>(
  url: string,
  config?: RequestConfig
): Promise<APIResponse<T>> {
  // Implementation would go here
  throw new Error('Not implemented');
}
