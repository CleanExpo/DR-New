/**
 * Advanced TypeScript Patterns - Pattern Library Export
 *
 * Re-exports all pattern implementations
 */

// Repository Pattern
export {
  BaseRepository,
  InMemoryRepository,
  RepositoryFactory,
} from './repository';

// Validation Pattern
export {
  ValidationService,
  CommonSchemas,
  SchemaComposer,
  CustomValidators,
  createFormValidator,
} from './validation';

export type { InferSchema } from './validation';

// API Client Pattern
export {
  APIClient,
  createAPIClient,
  apiClient,
} from './api-client';

export type {
  APIClientConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './api-client';
